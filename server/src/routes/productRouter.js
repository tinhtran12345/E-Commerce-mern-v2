import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    reviewProduct,
    updateProduct,
    uploadImagesProduct,
} from "../controllers/productController.js";
import { isAdmin, verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:pid", getProductById);
router.post("/", [verifyToken, isAdmin], createProduct);
router.put(
    "/uploading-image/:pid",
    [verifyToken, isAdmin],
    uploadImagesProduct
);
router.put("/:pid", [verifyToken, isAdmin], updateProduct);
router.post("/review", [verifyToken], reviewProduct);
router.delete("/:pid", [verifyToken, isAdmin], deleteProduct);
export default router;
