const express = require("express");
const cookieParser = require("cookie-parser");
const mainRouter = require("./src/app.routes");
const notFoundHandler = require("./src/common/exception/notFound.handler");
const allExceptionHandler = require("./src/common/exception/allExceptions.handler");

const main = async () => {
    const app = express();
    require("dotenv").config();
    require("./src/configs/mongoose.config");
    const swaggerConfig = require("./src/configs/swagger.config");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
    swaggerConfig(app);
    app.use(mainRouter);
    notFoundHandler(app);
    allExceptionHandler(app);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
}
main();