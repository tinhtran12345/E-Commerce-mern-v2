import {
    generateAccessToken,
    generateRefreshToken,
} from "../middlewares/jwt.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({
            success: false,
            mes: "Missing input!",
        });
    }
    const user = await User.findOne({ email });

    if (user) throw new Error("User has existed");
    else {
        const newUser = await User.create(req.body);
        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser
                ? "Register is successfully. Please go login"
                : "Something went wrong",
        });
    }
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs",
        });
    }
    const response = await User.findOne({ email });
    if (response && (await response.isCorrectPassword(password))) {
        const { password, role, refreshToken, ...userData } =
            response.toObject();
        // create accessToken
        const accessToken = generateAccessToken(response._id, role);
        // Create refreshToken
        const newRefreshToken = generateRefreshToken(response._id);

        // save refreshToken into db and cookie
        await User.findOneAndUpdate(
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

export const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) {
        throw new Error("No refresh token in cookies");
    }
    await User.findOneAndUpdate(
        { refreshToken: cookie.refreshToken },
        { refreshToken: "" },
        { new: true }
    );
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    return res.status(200).json({
        success: true,
        mes: "Logout is done",
    });
});
export const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById({ _id }).select(
        "-refreshToken -password -role"
    );
    return res.status(200).json({
        success: user ? true : false,
        res: user ? user : "User not found!",
    });
});

// When accessToken Expired
export const refreshAccessToken = asyncHandler(async (req, res) => {
    // When accessToken expired, let refreshToken from cookies
    const cookies = req.cookies;
    // check refreshToken in cookies
    if (!cookies || !cookies.refreshToken) {
        throw new Error("No refresh Token in cookies!");
    }
    // Check refreshToken is verifyToken ?
    const checkRefreshToken = jwt.verify(
        cookies.refreshToken,
        process.env.JWT_SECRET
    );
    const response = await User.findOneAndUpdate(
        {
            _id: checkRefreshToken._id,
            refreshToken: cookies.refreshToken,
        },
        { refreshToken: generateRefreshToken(checkRefreshToken._id) },
        { new: true }
    );
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response
            ? generateAccessToken(response._id, response.role)
            : "Refresh Token not matched",
    });
});
