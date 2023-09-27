import express from "express";
import {
    insertCategory,
    insertProducts,
} from "../controllers/insertDataController.js";

const router = express.Router();
router.post("/", insertProducts);
router.post("/category", insertCategory);

export default router;
