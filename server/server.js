import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/", (req, res) => {
//     res.send("Server on ...");
// });

connectDb();

app.listen(port, () => {
    console.log(`Server running on the port ${port}`);
});
