const autoBind = require("auto-bind-es5");

const UserModel = require("./user.model");
const createHttpError = require("http-errors");


class UserService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = UserModel;
    }

}
module.exports = new UserService();