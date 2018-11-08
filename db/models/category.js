const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
    unique: 'This category already exists',
  },
  description: {
    type: String
  },
  parentId: {
    type: mongoose.Types.ObjectId
  }
});

Schema.statics.publicFields = ['name', 'description', 'parentId'];

module.exports = mongoose.model('Category', Schema);