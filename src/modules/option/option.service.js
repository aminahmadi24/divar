const autoBind = require("auto-bind-es5");
const OptionModel = require("./option.model");
const createHttpError = require("http-errors");
const { optionMessage } = require("./option.message");
const { default: slugify } = require("slugify");
const { isValidObjectId } = require("mongoose");
const categoryService = require("../category/category.service");
const { isTrue, isFalse } = require("../../common/utils/functions");

class OptionService {
    #model;
    #categoryService;
    constructor() {
        autoBind(this);
        this.#model = OptionModel;
        this.#categoryService = categoryService;
    }
    async findByCategorySlug(slug) {
        const options = await this.#model.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                },
            },
            {
                $unwind: { path: "$category" }
            },
            {
                $addFields: {
                    categoryName: "$category.name",
                    categorySlug: "$category.slug",
                    categoryIcon: "$category.icon"
                }
            },
            {
                $project: {
                    __v: 0,
                    category: 0
                }
            },
            {
                $match: {
                    categorySlug: slug
                }
            }
        ]);
        if (options.length === 0) {
            return new createHttpError.NotFound(optionMessage.optionNotFound);
        }
        return options;
    }
    async findByCategoryId(categoryId) {
        if (!isValidObjectId(categoryId)) {
            throw new createHttpError.BadRequest(optionMessage.invalidId);
        }
        const options = await this.#model.find({ category: categoryId }, { __v: 0 }).populate({ path: "category", select: ["name", "slug"] }).lean();
        if (options.length < 1) {
            throw new createHttpError.NotFound(optionMessage.optionNotFound);
        }
        return options;
    }
    async findById(id) {
        if (!isValidObjectId(id)) {
            throw new createHttpError.BadRequest(optionMessage.invalidId);
        }
        const option = await this.#model.findById(id, { __v: 0 }).populate([{ path: "category", select: ["name", "slug"] }]);
        if (!option) {
            throw new createHttpError.NotFound(optionMessage.optionNotFound);
        }
        return option;
    }
    async find() {
        const options = await this.#model.find({}, { __v: 0 }).populate([{ path: "category", select: ["name", "slug"] }]).sort({ _id: -1 }).lean();
        return options;
    }
    async create(optionDto) {
        await this.checkCatExistsById(optionDto.category);
        if (optionDto?.list && typeof optionDto.list === "string") {
            optionDto.list = optionDto.list.split(",");
        } else if (!Array.isArray(optionDto.list)) {
            optionDto.list = [];
        }
        if (isTrue(optionDto?.required)) optionDto.required = true;
        if (isFalse(optionDto?.required)) optionDto.required = false;
        await this.checkOptExistsByKeyAndCat(optionDto.key, optionDto.category);
        optionDto.key = slugify(optionDto.key, { trim: true, replacement: "_", lower: true });
        const option = await this.#model.create(optionDto);
        return option;
    }
    async update(id, optionDto) {
        const option = await this.checkOptExistsById(id);
        if (optionDto?.category) {
            const category = await this.checkCatExistsById(optionDto.category);
        }
        if (optionDto?.list && typeof optionDto.list === "string") {
            optionDto.list = optionDto.list.split(",");
        } else if (!Array.isArray(optionDto.list)) {
            delete optionDto.list;
        }
        if (isTrue(optionDto?.required)) optionDto.required = true;
        if (isFalse(optionDto?.required)) optionDto.required = false;
        await this.checkOptExistsByKeyAndCat(optionDto.key, optionDto.category);
        optionDto.key = slugify(optionDto.key, { trim: true, replacement: "_", lower: true });
        return this.#model.updateOne({ _id: id }, { $set: optionDto });
    }
    async removeOptionById(id) {
        await this.checkOptExistsById(id);
        return true;
    }

    async checkOptExistsById(id) {
        if (!isValidObjectId(id)) {
            throw new createHttpError.BadRequest(optionMessage.invalidId);
        }
        const option = await this.#model.findOne({ _id: id });
        if (!option) {
            throw new createHttpError.NotFound(optionMessage.optionNotFound);
        }
        return option;
    }
    async checkCatExistsById(id) {
        const category = await this.#categoryService.checkCatExistsById(id);
        return category;
    }
    async checkOptExistsByKeyAndCat(key, category) {
        const option = await this.#model.findOne({ key, category }).lean();
        if (option) throw new createHttpError.Conflict(optionMessage.optionAlreadyExists);
        return null;
    }
}
module.exports = new OptionService();