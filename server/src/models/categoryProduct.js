import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true,
            index: true,
        },
        brands: {
            type: Array,
            // required: true,
        },
        image: {
            type: String,
            // required: true,
        },
    },
    { timestamps: true }
);

const categoryProduct = mongoose.model("CategoryProduct", categorySchema);
export default categoryProduct;
