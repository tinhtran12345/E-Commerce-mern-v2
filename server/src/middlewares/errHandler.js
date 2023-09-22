export const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not Found!`);
    res.status(404);
    next(error);
};
// throw new Error("smt"):  error?.message and statusCode =200
export const errHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    return res.status(statusCode).json({
        success: false,
        msg: error?.message,
    });
};
