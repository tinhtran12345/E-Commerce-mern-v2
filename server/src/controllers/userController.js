import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import crypto from "crypto";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../middlewares/jwt.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { sendMail } from "../utils/sendEmail.js";
dotenv.config();

export const register = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({
            success: false,
            msg: "Missing inputs",
        });
    }

    const user = await User.findOne({ email });
    if (user) {
        throw new Error("User existed!");
    } else {
        const newUser = await User.create(req.body);
        return res.status(200).json({
            success: newUser ? true : false,
            msg: newUser
                ? "Register successfully, please go to login ..."
                : "Something went wrong!",
        });
    }
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            msg: "Missing inputs!",
        });
    }
    const response = await User.findOne({ email });

    if (response && (await response.isCorrectPassword(password))) {
        const { password, role, refreshToken, ...userData } =
            response.toObject();
        // create accessToken

        const accessToken = generateAccessToken(response._id, role);
        const newRefreshToken = generateRefreshToken(response._id);

        // save newRefreshToken in db và cookies
        await User.findByIdAndUpdate(
            response._id,
            { refreshToken: newRefreshToken },
            { new: true }
        );
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            success: true,
            accessToken,
            userData,
        });
    } else {
        throw new Error("Invalid credentials!");
    }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select(
        "-refreshToken -password -role"
    );
    return res.status(200).json({
        success: user ? true : false,
        msg: user ? user : "User not found!",
    });
});

export const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshToken) {
        throw new Error("No refresh token in cookies");
    }
    await User.findOneAndUpdate(
        { refreshToken: cookie.refreshToken },
        { refreshToken: " " },
        { new: true }
    );
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res
        .status(200)
        .json({ success: true, msg: "Logout is successful!" });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshToken) {
        throw new Error("No refresh token in cookies");
    }
    //check refreshToken is valid?
    const uid = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
    const response = await User.findOne({
        _id: uid._id,
        refreshToken: cookie.refreshToken,
    });

    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response
            ? generateAccessToken(response._id, response.role)
            : "Refresh token not matched",
    });
});

// user ấn vào nút forgotPassword => Yêu cầu user nhập email và bấm gửi => call api: Lấy email từ query được hay không
//          --> Không lấy được => Missing input!
//          --> Lấy được => Tim kiếm user trong db với email tương ứng ?
//                  --> Không tìm được => User not found!
//                  --> Tìm được => Tạo một cái resetToken(Để xác thực khi reset password) và lưu nó vào trương passwordResetToken, cập nhật passwordResetExpires (hạn)
//                      => Gửi tin nhắn mặc định (điều hướng đến nút reset password) tới gmail của user đã nhập trước đó => trả về lại res thu đươc đươc
//  Lưu ý sử dụng google app password để sử dụng nodemailer

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({
            success: false,
            msg: "Missing input!",
        });
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found!");
    }
    const resetToken = await user.createPasswordChangedToken();
    await user.save();

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_CLIENT}/resetPassword/${resetToken}>Click here</a>`;
    const subject = "Forgot Password";
    const data = {
        email,
        html,
        subject,
    };
    const responseEmail = await sendMail(data);
    return res.status(200).json({
        success: true,
        responseEmail,
    });
});

// flow: user sẽ nhập vào new password và  reset token (tự động gắn vào khi call api). Check các trường?
//      --> Nếu không: Trả về missing input
//      --> Nếu Đủ: createHash  reset token user vừa nhập => tìm kiếm cái user với cái token vừa hash và password reset expired
//              --> Nếu không tìm  được user => Invalid reset Token
//              --> Nếu tìm được thì update lại các trường tương ứng => lưu lại => Trả về thành công

export const resetPassword = asyncHandler(async (req, res) => {
    const { password, resetToken } = req.body;
    if (!password || !resetToken) {
        return res.status(400).json({
            success: false,
            msg: "Missing inputs!",
        });
    }
    const passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const user = await User.findOne({
        passwordResetToken: passwordResetToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
        throw new Error("Invalid reset Token!");
    }

    user.password = password;
    user.passwordChangedAt = Date.now();
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    const html = `Password Reset Successfully`;
    const email = user.email;
    const subject = "Reset Password";

    const replyEmail = await sendMail({
        html,
        email,
        subject,
    });

    return res.status(200).json({
        success: replyEmail ? true : false,
        msg: replyEmail
            ? "Password Reset Successfully!"
            : "Something went wrong!",
    });
});

// is Admin
// search, pagination user
// flow: Ở phía frontend có url:{localhost}?searchName = "username" &page=2 & limit= 5
// => input: {searchName, page, limit} = req.query
// =>

export const getUsers = asyncHandler(async (req, res) => {
    const user = await User.find().select("-refreshToken -password -role");
    return res.status(200).json({
        success: user ? true : false,
        msg: user ? user : "Something went wrong!",
    });
});

//  user update own profile
export const updateUser = asyncHandler(async (req, res) => {});
