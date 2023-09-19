import express from "express";
import * as dotenv from "dotenv";
import { connectDb } from "./src/config/connectDb.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// app.get("/test", (req, res) => {
//     res.send("Hello World!");
// });

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
