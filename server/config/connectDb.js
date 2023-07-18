import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", false);

export const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        if (connection.connection.readyState === 1)
            console.log("DB connection is successfully!");
        else console.log("DB connecting");
    } catch (error) {
        console.log("DB connection is failed!");
        throw new Error(error);
    }
};
