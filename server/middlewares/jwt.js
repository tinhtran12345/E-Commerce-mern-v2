import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = (uid, role) =>
    jwt.sign({ _id: uid, role }, process.env.JWT_SECRET, { expiresIn: "60s" });
export const generateRefreshToken = (uid) =>
    jwt.sign({ _id: uid }, process.env.JWT_SECRET, { expiresIn: "7d" });
