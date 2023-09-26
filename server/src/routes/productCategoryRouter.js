import express from "express";

import { isAdmin, verifyToken } from "../middlewares/verifyToken.js";
import {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory,
} from "../controllers/productCategoryController.js";

const router = express.Router();

router.post("/", [verifyToken, isAdmin], createCategory);
router.get("/", getCategories);
router.put("/:pcid", [verifyToken, isAdmin], updateCategory);
router.delete("/:pcid", [verifyToken, isAdmin], deleteCategory);

export default router;
