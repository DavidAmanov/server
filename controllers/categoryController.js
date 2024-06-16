const { Category } = require('../models/models');
const ApiError = require('../error/ApiError');

class CategoryController {
    async add(req, res, next) {
        try {
            const { name } = req.body;
            const category = await Category.create({ name: name });
            return res.json(category);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async remove(req, res, next) {
        try {
            const { name } = req.body;
            const category = await Category.findOne({ where: { name: name } });
            if (!category) {
                return next(ApiError.badRequest("Can't find the category"));
            }
            await category.destroy();
            return res.json({ message: "Category successfully deleted" });
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async getCategoryByName(req, res, next) {
        try {
            const { name } = req.params;
            const category = await Category.findOne({ where: { name: name } });
            if (!category) {
                return next(ApiError.badRequest("Can't find the category"));
            }
            return res.json(category);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async getAllCategories(req, res, next) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (e) {
            return next(ApiError.badRequest("Can't find any category"));
        }
    }
}

module.exports = new CategoryController();
