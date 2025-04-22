const autoBind = require("auto-bind-es5");
const optionService = require("./option.service");
const { StatusCodes } = require("http-status-codes");
const { optionMessage } = require("./option.message");

class OptionController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = optionService;
    }
    async create(req, res, next) {
        try {
            const { title, key, type, list, guide, required, category } = req.body;
            await this.#service.create({ title, key, type, list, guide, required, category });
            return res.status(StatusCodes.CREATED).json({
                message: optionMessage.optionCreated
            });
        } catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { title, key, type, list, guide, required, category } = req.body;
            const { id } = req.params;
            await this.#service.update(id, { title, key, type, list, guide, required, category })
            return res.json({
                message: optionMessage.updated
            })
        } catch (error) {
            next(error);
        }
    }
    async findByCategorySlug(req, res, next) {
        try {
            const { slug } = req.params;
            const options = await this.#service.findByCategorySlug(slug);
            return res.json(options);
        } catch (error) {
            next(error);
        }
    }
    async findByCategoryId(req, res, next) {
        try {
            const { categoryId } = req.params;
            const options = await this.#service.findByCategoryId(categoryId);
            return res.json(options);
        } catch (error) {
            next(error);
        }
    }
    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const option = await this.#service.findById(id);
            return res.json(option);
        } catch (error) {
            next(error);
        }
    }
    async find(req, res, next) {
        try {
            const options = await this.#service.find();
            return res.json(options);
        } catch (error) {
            next(error);
        }
    }
    async removeOptionById(req, res, next) {
        try {
            const { id } = req.params;
            await this.#service.removeOptionById(id);
            return res.json({
                message: optionMessage.optionRemoved
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new OptionController();