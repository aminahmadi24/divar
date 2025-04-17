const autoBind = require("auto-bind-es5");
const categoryService = require("./category.service");
const { StatusCodes } = require("http-status-codes");
const { categoryMessage } = require("./category.message");

class CategoryController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = categoryService;
    }
    async create(req, res, next) {
        try {

            const { name, icon, slug, parent } = req.body;
            await this.#service.create({ name, icon, slug, parent });
            return res.status(StatusCodes.CREATED).json({
                message: categoryMessage.created
            });
        } catch (error) {
            next(error);
        }
    }
    async find(req, res, next) {
        const categories = await this.#service.find();
        return res.json(categories);
    }
}

module.exports = new CategoryController();