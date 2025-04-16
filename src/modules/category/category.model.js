const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    parent: { type: mongoose.Types.ObjectId, ref: "Category", required: false },
    parents: { type: [mongoose.Types.ObjectId], ref: "Category", required: false, default: [] }
}, { virtuals: true, versionKey: false, id: false, timestamps: true });

CategorySchema.virtual("children", {
    ref: "Category",
    localField: "_id",
    foreignField: "parent"
});

const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel;