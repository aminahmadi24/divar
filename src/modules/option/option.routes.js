const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router();
router.post("/", optionController.create);
router.get("/by-category-id/:categoryId", optionController.findByCategoryId);
router.get("/by-category-slug/:slug", optionController.findByCategorySlug);
router.get("/:id", optionController.findById);
router.get("/", optionController.find);
router.delete("/:id", optionController.removeOptionById);
router.put("/:id", optionController.update);

module.exports = {
    optionRouter: router
}