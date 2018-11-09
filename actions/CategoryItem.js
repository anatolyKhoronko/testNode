const mongoose = require('mongoose');
const { pick } = require('lodash');

class CategoryItem {

  constructor(model){
    this.model = model;
  }

  async getAllItems() {
    return await this.model.find();
  }

  async getItemById(id){
    try{
      if(!mongoose.Types.ObjectId.isValid(id)) {
        throw { customError: true, statusCode: 400, message: 'Id isn`t valid' }
      }
      const item = await this.model.findById(id);
      if(!item) throw { customError: true, statusCode: 404, message: 'Item with this id doesn`t exist' };
      return item;
    } catch (e) {
      throw e;
    }
  }

  async getItemsByCategoryId(categoryId) {
    try{
      if(!mongoose.Types.ObjectId.isValid(categoryId)) {
        throw { customError: true, statusCode: 400, message: 'Id isn`t valid' }
      }
      return await this.model.find({categoryId});
    } catch (e) {
      throw e;
    }
  }

  async createItem(data) {
    try {
      return await this.model.create(pick(data, this.model.publicFields));
    } catch (e) {
      throw e;
    }
  }

  async updateItem(id, data) {
    const item = await this.getItemById(id);
    try{
      const newItem = Object.assign(item, pick(data, this.model.publicFields));
      await newItem.save();
      return newItem;
    } catch (e) {
      throw { customError: true, statusCode: 400, message: 'Bad request' };
    }
  }

  async deleteItem(id) {
    const item = await this.getItemById(id);
    await item.remove();
    return item;
  }

  async deleteItemsFromCategory(categoryId) {
    return await this.model.remove({categoryId});
  }
}

module.exports = CategoryItem;