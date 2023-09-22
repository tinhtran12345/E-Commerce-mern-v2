import express from "express";
import { connectDb } from "./src/config/connectDb.js";
import cookieParser from "cookie-parser";
import initRoutes from "./src/routes/index.js";
import cors from "cors";
import * as dotenv from "dotenv";
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
app.use(cors());

initRoutes(app);

connectDb();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
