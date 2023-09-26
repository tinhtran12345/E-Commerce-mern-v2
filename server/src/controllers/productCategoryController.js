import asyncHandler from "express-async-handler";
import categoryProduct from "../models/categoryProduct.js";

export const createCategory = asyncHandler(async (req, res) => {
    const response = await categoryProduct.create(req.body);
    return res.json({
        success: response ? true : false,
        createdCategory: response
            ? response
            : "Cannot be created product category",
    });
});
export const getCategories = asyncHandler(async (req, res) => {
    const response = await categoryProduct.find();
    return res.json({
        success: response ? true : false,
        prodCategories: response
            ? response
            : "Cannot be get product categories",
    });
});
export const updateCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await categoryProduct.findByIdAndUpdate(pcid, req.body, {
        new: true,
    });
    return res.json({
        success: response ? true : false,
        updatedCategory: response
            ? response
            : "Cannot be updated product category",
    });
});
export const deleteCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await categoryProduct.findByIdAndDelete(pcid);
    return res.json({
        success: response ? true : false,
        deletedCategory: response
            ? response
            : "Cannot be deleted product category",
    });
});
