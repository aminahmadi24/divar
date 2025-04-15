const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
    code: { type: String, required: false, default: undefined },
    expiresIn: { type: Number, required: false, default: 0 }
});

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: false },
    mobile: { type: String, required: true, unique: true },
    otp: { type: OTPSchema },
    isMobileVerified: { type: Boolean, default: false, required: true },
    accessToken: { type: String }
}, { timestamps: true });

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;