import userRoute from "./userRouter.js";

import productRouter from "./productRouter.js";
import { errHandler, notFound } from "../middlewares/errHandler.js";

const initRoutes = (app) => {
    app.use("/api/user", userRoute);
    app.use("/api/product", productRouter);

    app.use(notFound);
    app.use(errHandler);

    return app.use("/", (req, res) => {
        console.log("Server on ...");
    });
};

export default initRoutes;
