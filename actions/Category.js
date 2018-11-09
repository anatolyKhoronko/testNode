const mongoose = require('mongoose');
const { pick } = require('lodash');
const CategoryModel = require('../db/models/category');
const Recipe = require('./Recipe');

class Category {
  async getCategories() {
    return await CategoryModel.find();
  }

  async getCategoryById(id) {
    try{
      if(!mongoose.Types.ObjectId.isValid(id)) {
        throw { customError: true, statusCode: 400, message: 'Id isn`t valid' }
      }
      const category = await CategoryModel.findById(id);
      if(!category) throw { customError: true, statusCode: 404, message: 'Category with this id doesn`t exist' };
      return category;
    } catch (e) {
      throw e;
    }
  }

  async createCategory(data) {
    try {
      return await CategoryModel.create(pick(data, CategoryModel.publicFields));
    } catch (e) {
      throw e;
    }
  }

  async updateCategory(id, data) {
    const category = await this.getCategoryById(id);
    try{
      const newCategory = Object.assign(category, pick(data, CategoryModel.publicFields));
      await newCategory.save();
      return newCategory;
    } catch (e) {
      throw { customError: true, statusCode: 400, message: 'Bad request' };
    }
  }

  async deleteCategory(id) {
    const category = await this.getCategoryById(id);
    await category.remove();
    await Recipe.deleteRecipesFromCategory(id);
    const children = await CategoryModel.find({parentId: id});
    if(!children.length) return { success: true};
    for(let child of children) {
      await this.deleteCategory(child._id)
    }
  }
}

module.exports = new Category();