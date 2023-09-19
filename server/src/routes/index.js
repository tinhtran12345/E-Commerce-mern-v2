const initRoutes = (app) => {
    return app.use("/", (req, res) => {
        console.log("Server on ...");
    });
};

export default initRoutes;
