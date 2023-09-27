import asyncHandler from "express-async-handler";
import Product from "../models/product.js";
import categoryProduct from "../models/categoryProduct.js";
import products_data1 from "../../data/products_data1.json" assert { type: "json" };
import products_data2 from "../../data/products_data2.json" assert { type: "json" };
import products_data3 from "../../data/products_data3.json" assert { type: "json" };

import slugify from "slugify";
import {
    getPrices,
    getRandomNumber,
    getTotalRating,
} from "../utils/functions.js";
const categoryId = [
    { phoneId: "65129cacfda2ce6c62b06749" },
    { laptopId: "65129cacfda2ce6c62b0674a" },
    { ipadId: "65129cacfda2ce6c62b0674b" },
];

const fn = async (product) => {
    const category = await categoryProduct.findById(categoryId[1].laptopId);

    await Product.create({
        category: category.id,
        title: product.title,
        slug: slugify(product.title),
        brand: product.brand,
        images: product.images,
        colors: product.colors,
        price: getPrices(product.price),
        specifications: product.specifications,
        features_imgs: product.features_imgs,
        description: product.description,
        quantity: getRandomNumber(),
        sold: getRandomNumber(),
        reviews: product.reviews,
        totalRatings: getTotalRating(product.reviews),
    });
};

// using promise all đẻ xử lí việc ghi data
//
const fnInsertCate = async (data) => {
    await categoryProduct.create({
        name: data.name,
        brands: data.brands,
        image: data?.image,
    });
};

export const insertProducts = asyncHandler(async (req, res) => {
    const promises = [];
    const data = [...products_data3];

    data.forEach((item) => {
        promises.push(fn(item));
    });
    Promise.all(promises);

    return res.status(200).json({
        msg: "Oke",
    });
});

export const insertCategory = asyncHandler(async (req, res) => {
    const promises = [];
    data_cate.forEach((item) => {
        promises.push(fnInsertCate(item));
    });
    Promise.all(promises);

    return res.status(200).json("oke");
});
