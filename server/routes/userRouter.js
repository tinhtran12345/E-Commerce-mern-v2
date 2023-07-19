import express from "express";
import {
    getCurrent,
    login,
    logout,
    refreshAccessToken,
    register,
} from "../controllers/userController.js";
import { verifyAccessToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current", verifyAccessToken, getCurrent);
router.post("/refreshtoken", refreshAccessToken);

export default router;
