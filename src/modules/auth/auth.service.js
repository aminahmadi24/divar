const autoBind = require("auto-bind-es5");
const jwt = require("jsonwebtoken");

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
            code: String(randomInt(10000, 99999)),
            expiresIn: now + (2 * 60 * 1000)
        }
        if (!user) {
            const newUser = new this.#model({ mobile, otp });
            await newUser.save();
            return newUser;
        }
        if (user.otp && user.otp.expiresIn > now) {
            throw new createHttpError.BadRequest(authMessage.otpCodeIsNotExpired);
        }
        user.otp = otp;
        await user.save();
        return user;
    }
    async checkOTP(mobile, code) {

        const user = await this.checkUserExistsByMobile(mobile);
        const now = new Date().getTime();
        if (user?.otp?.expiresIn < now) {
            throw new createHttpError.Unauthorized(authMessage.otpCodeIsExpired);
        }
        if (user?.otp?.code !== code) {
            throw new createHttpError.Unauthorized(authMessage.otpCodeIsIncorrect)
        }
        if (!user.isMobileVerified) {
            user.isMobileVerified = true;
        }
        const accessToken = await this.signAccessToken({ id: user._id, mobile: user.mobile });
        user.accessToken = accessToken;
        await user.save();
        return accessToken;
    }
    async checkUserExistsByMobile(mobile) {
        const user = await this.#model.findOne({ mobile });
        if (!user) throw new createHttpError.NotFound(authMessage.notFound);
        return user;
    }
    async signAccessToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "30d" })
    }
}
module.exports = new AuthService();