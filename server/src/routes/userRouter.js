import express from "express";
import {
    forgotPassword,
    getCurrentUser,
    getUsers,
    login,
    logout,
    refreshAccessToken,
    register,
    resetPassword,
    updateUser,
} from "../controllers/userController.js";
import { isAdmin, verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", verifyToken, getCurrentUser);
router.get("/logout", logout);
router.post("/refreshAccessToken", refreshAccessToken);
router.get("/forgotPassword", forgotPassword);
router.put("/resetPassword", resetPassword);
router.get("/getUsers", [verifyToken, isAdmin], getUsers);
router.put("/current", [verifyToken], updateUser);
export default router;
