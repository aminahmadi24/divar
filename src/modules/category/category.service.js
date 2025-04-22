const autoBind = require("auto-bind-es5");
const CategoryModel = require("./category.model");
const { isValidObjectId, default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");
const { categoryMessage } = require("./category.message");
const optionModel = require("./../option/option.model");
const { default: slugify } = require("slugify");

class CategoryService {
    #model;
    #optionModel;
    constructor() {
        autoBind(this);
        this.#model = CategoryModel;
        this.#optionModel = optionModel;
    }
    async create(categoryDto) {
        if (categoryDto?.parent == "") {
            categoryDto.parent = undefined;
        }
        if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
            const parentCategory = await this.checkCatExistsById(categoryDto.parent);
            categoryDto.parent = parentCategory._id;
            categoryDto.parents = [
                ...new Set([parentCategory._id.toString(),
                ...(parentCategory?.parents?.map(id => id.toString()))
                ])
            ].map(id => new mongoose.Types.ObjectId(id));
        }
        if (categoryDto?.slug) {
            categoryDto.slug = slugify(categoryDto.slug);
            await this.checkSlugAlreadyExists(categoryDto.slug);
        } else {
            categoryDto.slug = slugify(categoryDto.name);
            await this.checkSlugAlreadyExists(categoryDto.slug);
        }
        const category = await this.#model.create(categoryDto);
        return category;
    }

    async find() {
        const categories = await this.#model.find({ parent: { $exists: false } }).select("-updatedAt").lean();
        return categories;
    }
    async remove(id) {
        await this.checkCatExistsById(id);
        await this.#optionModel.deleteMany({ category: id }).finally(async () => {
            await this.#model.deleteOne({ _id: id });
        })
        return true;
    }
    async checkCatExistsById(id) {
        if (!isValidObjectId(id)) {
            throw createHttpError.BadRequest(categoryMessage.invalidId);
        }
        const category = await this.#model.findById(id);
        if (!category) throw new createHttpError.NotFound(categoryMessage.notFoundCategory);
        return category;
    }
    async checkSlugAlreadyExists(slug) {
        const category = await this.#model.findOne({ slug }).lean();
        if (category) throw new createHttpError.Conflict(categoryMessage.slugAlreadyExists);
        return null;
    }
}
module.exports = new CategoryService();