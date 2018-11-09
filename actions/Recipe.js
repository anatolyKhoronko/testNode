const mongoose = require('mongoose');
const { pick } = require('lodash');
const RecipeModel = require('../db/models/recipe');

class Category {
  async getAllRecipes() {
    return await RecipeModel.find();
  }

  async getRecipeById(id){
    try{
      if(!mongoose.Types.ObjectId.isValid(id)) {
        throw { customError: true, statusCode: 400, message: 'Id isn`t valid' }
      }
      const recipe = await RecipeModel.findById(id);
      if(!recipe) throw { customError: true, statusCode: 404, message: 'Recipe with this id doesn`t exist' };
      return recipe;
    } catch (e) {
      throw e;
    }
  }

  async getRecipesByCategoryId(categoryId) {
    try{
      if(!mongoose.Types.ObjectId.isValid(id)) {
        throw { customError: true, statusCode: 400, message: 'Id isn`t valid' }
      }
      return await RecipeModel.find({categoryId});
    } catch (e) {
      throw e;
    }
  }

  async createRecipe(data) {
    try {
      return await RecipeModel.create(pick(data, RecipeModel.publicFields));
    } catch (e) {
      throw { customError: true, statusCode: 400, message: 'Bad request' };
    }
  }

  async updateRecipe(id, data) {
    const category = await this.getRecipeById(id);
    try{
      const newRecipe = Object.assign(category, pick(data, RecipeModel.publicFields));
      await newRecipe.save();
      return newRecipe;
    } catch (e) {
      throw { customError: true, statusCode: 400, message: 'Bad request' };
    }
  }

  async deleteRecipe(id) {
    const recipe = await this.getCategoryById(id);
    await recipe.remove();
    return recipe;
  }

  async deleteRecipesFromCategory(categoryId) {
    return await RecipeModel.remove({categoryId});
  }
}

module.exports = new Category();