import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import * as dotenv from "dotenv";
dotenv.config();

// flow: check xem ở phần req.headers.authorization.startWith("Bearer") có accessToken hay không
//  -->  Có => Lấy token = > check xem còn hạn không
//              --> Có => Lưu decoded và req.user. => next()
//              --> Không => trả về "Invalid token".
// --> Không => trả về Require authentication

export const verifyToken = asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        const accessToken = req.headers?.authorization.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_SECRET, function (err, decode) {
            if (err) {
                return res.status(401).json({
                    success: false,
                    msg: "Invalid access token!",
                });
            }
            req.user = decode;
            next();
        });
    } else {
        return res.status(401).json({
            success: false,
            msg: "Require authentication!",
        });
    }
});

// flow : Lấy role từ req.user => Check xem giá trị role
//        --> role không phải admin => false
//         --> chuyển next()
export const isAdmin = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role !== "admin") {
        return res.status(401).json({
            success: false,
            msg: "Require admin role!",
        });
    }
    next();
});
