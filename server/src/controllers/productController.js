import asyncHandler from "express-async-handler";
import slugify from "slugify";
import Product from "../models/product.js";
import * as dotenv from "dotenv";
import { likeComment } from "../utils/likedComment.js";
dotenv.config();
export const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            msg: "Missing inputs",
        });
    }
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
        success: newProduct ? true : false,
        newProduct: newProduct ? newProduct : "No create product!",
    });
});
export const getProductById = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const response = await Product.findById(pid);
    return res.status(200).json({
        success: response ? true : false,
        product: response ? response : "Not found product",
    });
});

export const getAllProducts = asyncHandler(async (req, res) => {
    // filter, sort and pagination
    const queries = { ...req.query };

    const excludeFields = ["limit", "page", "max", "min", "order", "sort"];
    excludeFields.forEach((el) => delete queries[el]);
    if (queries?.title)
        queries.title = { $regex: queries.title, $options: "i" };

    const queryCommand = Product.find(queries);

    //  sort price
    let queriesPrice;
    if (req.query?.sort === "price") {
        let sortQuery = {
            price: req.query?.order === "desc" ? -1 : 1,
        };
        queriesPrice = {
            $and: [
                { price: { $lt: req.query?.max ? req.query?.max : 900000000 } },
                { price: { $gt: req.query?.min ? req.query?.min : -1 } },
            ],
        };

        queryCommand.find(queriesPrice).sort(sortQuery);
    }
    // pagination
    const page = +req.query.page || 1; // + mean: convert string to number
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    queryCommand
        .exec()
        .then(async (data) => {
            const counts = await Product.find({
                ...queries,
                ...queriesPrice,
            }).countDocuments();

            return res.status(200).json({
                success: data ? true : false,
                counts,
                products: data ? data : "Cannot get products",
            });
        })
        .catch((err) => {
            throw new Error(err.message);
        });
});
export const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (req.body && req.body?.title) {
        req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
        new: true,
    });
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct
            ? updatedProduct
            : "Cannot update product",
    });
});
export const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(pid, req.body);
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deleteProduct: deletedProduct
            ? deletedProduct
            : "Cannot delete product",
    });
});
export const uploadImagesProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const imagesPath = req.files.map((el) => el.path);
    if (!req.files) throw new Error("Missing inputs");
    const response = await Product.findByIdAndUpdate(
        pid,
        { $push: { images: { $each: imagesPath } } },
        { new: true }
    );
    return res.status(200).json({
        success: response ? true : false,
        updatedImages: response ? response : "Cannot upload images product",
    });
});
export const reviewProduct = asyncHandler(async (req, res) => {
    // flow: input: star, comment, pid, liked : req.body => find product by id
    // check user đã review
    // --> rồi thì sẽ update review
    // --> Chưa có: thì sẽ push thêm newReview vào mảng
    // => update lại total rating
    const { star, comment, pid, liked } = req.body;
    const { _id } = req.user;

    const reviewProduct = await Product.findById(pid);
    if (!reviewProduct) {
        throw new Error("Product not found!");
    }

    const isReview = reviewProduct?.reviews.find((item) => {
        const postedId = JSON.stringify(item.postedBy);
        const uid = JSON.stringify(_id);
        return postedId === uid;
    });

    if (isReview) {
        // reviewProduct?.reviews.forEach(async (item) => {
        //     if (item.postedBy === _id) {
        //         item.rating = star;
        //         item.comment = comment;
        //         item.likeNumber = likeComment(
        //             liked,
        //             item.state,
        //             item.likeNumber
        //         );
        //         item.state = liked ? !item.state : item.state;
        //         await reviewProduct.save();
        //         return;
        //     }
        // });
        await Product.updateOne(
            { reviews: { $elemMatch: isReview } },
            {
                $set: {
                    "reviews.$.rating": star,
                    "reviews.$.comment": comment,
                    "reviews.$.likeNumber": likeComment(
                        liked,
                        isReview.state,
                        isReview.likeNumber
                    ),
                    "reviews.$.state": liked ? !isReview.state : isReview.state,
                },
            },
            { new: true }
        );
    } else {
        await Product.findByIdAndUpdate(pid, {
            $push: {
                reviews: {
                    postedBy: _id,
                    rating: star,
                    comment: comment,
                },
            },
        });
    }

    const updatedProduct = await Product.findById(pid);
    const ratingCount = updatedProduct.reviews.length;

    const sumRatings = updatedProduct.reviews.reduce(
        (sum, el) => sum + +el.rating,
        0
    );

    updatedProduct.totalRatings =
        Math.round((sumRatings * 10) / ratingCount) / 10;
    await updatedProduct.save();
    return res.status(200).json({
        status: true,
        updatedProduct,
    });
});
