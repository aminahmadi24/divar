const { Router } = require("express");
const authorization = require("../../common/guard/auth.guard");
const userController = require("./user.controller");
const router = Router();

router.get("/whoami", authorization, userController.whoami);


module.exports = {
    userRouter: router
}