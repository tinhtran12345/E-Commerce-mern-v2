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
import uploadCloud from "../config/cloudinaryConfig.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:pid", getProductById);
router.post("/", [verifyToken, isAdmin], createProduct);
router.put(
    "/uploading-image/:pid",
    [verifyToken, isAdmin],
    uploadCloud.array("images", 10),
    uploadImagesProduct
);
router.put("/:pid", [verifyToken, isAdmin], updateProduct);
router.post("/review", [verifyToken], reviewProduct);
router.delete("/:pid", [verifyToken, isAdmin], deleteProduct);
export default router;
