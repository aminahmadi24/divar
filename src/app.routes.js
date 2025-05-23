const { Router } = require("express");
const { authRouter } = require("./modules/auth/auth.routes");
const { userRouter } = require("./modules/user/user.routes");
const { categoryRouter } = require("./modules/category/category.routes");
const { optionRouter } = require("./modules/option/option.routes");
const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/category", categoryRouter);
mainRouter.use("/option", optionRouter);
module.exports = mainRouter;
