const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
    unique: 'This article already exists',
  },
  description: {
    type: String
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    required: 'Category is required',
  }
});

Schema.statics.publicFields = ['name', 'description', 'categoryId'];

module.exports = mongoose.model('Article', Schema);