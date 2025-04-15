const { default: autoBind } = require("auto-bind");
const authService = require("./auth.service");


class AuthController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = authService;
    }
    async sendOTP(req, res, next) {
        try {
            const { mobile } = req.body;
            const result = await this.#service.sendOTP(mobile);
        } catch (error) {
            next(error);
        }
    }
    async checkOTP(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
}
module.exports = new AuthController();