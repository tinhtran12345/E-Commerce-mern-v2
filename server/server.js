import express from "express";
import { connectDb } from "./config/connectDb.js";
import { initRoutes } from "./routes/index.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use("/", (req, res) => {
//     res.send("Server on ...");
// });

connectDb();
initRoutes(app);

app.listen(port, () => {
    console.log(`Server running on the port ${port}`);
});
