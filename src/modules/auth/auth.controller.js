const autoBind = require("auto-bind-es5");
const authService = require("./auth.service");
const authMessage = require("./auth.message");
const NODE_ENV = require("../../common/constant/env.enum");
const COOKIE_NAMES = require("../../common/constant/cookie.enum");


class AuthController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = authService;
    }
    async sendOTP(req, res, next) {
        try {
            const { mobile } = req.body;
            await this.#service.sendOTP(mobile);
            return res.json({
                message: authMessage.sendOtpSuccessfully
            })
        } catch (error) {
            next(error);
        }
    }
    async checkOTP(req, res, next) {
        try {
            const { mobile, code } = req.body;
            const accessToken = await this.#service.checkOTP(mobile, code);
            return res.cookie(COOKIE_NAMES.accessToken, accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === NODE_ENV.production
            }).json({
                message: authMessage.loginSuccessful,
            })
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            res.clearCookie(COOKIE_NAMES.accessToken);
            return res.json({
                message: authMessage.logoutSuccessful
            });
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new AuthController();