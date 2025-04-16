const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const authMessage = require("../messages/auth.message");
const UserModel = require("../../modules/user/user.model");

const authorization = async (req, res, next) => {
    try {
        const accessToken = req?.cookies?.accessToken;
        if (!accessToken)
            throw new createHttpError.Unauthorized(authMessage.login);

        const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        if (typeof payload === "object" && "id" in payload) {
            const user = await UserModel.findById(payload.id, { otp: 0, accessToken: 0 }).lean();
            if (!user) throw new createHttpError.Unauthorized(authMessage.notFoundAccount);
            req.user = user;
            return next();
        }
        throw new createHttpError.Unauthorized(authMessage.invalidAccessToken);
    } catch (error) {
        next(error)
    }
}
module.exports = authorization;