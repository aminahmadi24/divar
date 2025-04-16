const autoBind = require("auto-bind-es5");
const CategoryModel = require("./category.model");

class CategoryService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = CategoryModel;
    }
    async create(categoryDto) {

    }
    async find() {
        const categories = await this.#model.find({}).lean();
        return categories;
    }
}
module.exports = new CategoryService();