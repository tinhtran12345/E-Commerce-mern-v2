import { errHandler, notFound } from "../middlewares/errHandler.js";
import userRouter from "./userRouter.js";

export const initRoutes = (app) => {
    app.use("/api/user", userRouter);

    app.use(notFound);
    app.use(errHandler);
};
