const { default: autoBind } = require("auto-bind");
const UserModel = require("../user/user.model");
const { randomInt } = require("crypto");
const createHttpError = require("http-errors");
const authMessage = require("./auth.message");

class AuthService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = UserModel;
    }
    async sendOTP(mobile) {
        const user = await this.#model.findOne({ mobile });
        const now = new Date().getTime();
        const otp = {
            code: randomInt(10000, 99999),
            expiresIn: now + (2 * 60 * 1000)
        }
        if (!user) {
            const newUser = new this.#model({ mobile, otp });
            await newUser.save();
            return newUser;
        }
        if (user.otp && user.otp.expiresIn > now) {
            throw new createHttpError.BadRequest(authMessage.otpCodeNotExpired);
        }
        user.otp = otp;
        await user.save();
        return user;
    }
    async checkOTP(mobile, code) {

    }
}
module.exports = new AuthService();