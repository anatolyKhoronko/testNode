const Joi = require('joi');
const Category = require('../actions/Category');

const validation = ({ create = false }) => async(ctx, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(256),
    categoryId: Joi.string(),
  });
  if(create) {
    schema.name = Joi.string().min(3).max(30).required();
    schema.categoryId = Joi.string().required();
  }
  const { error, value } = Joi.validate(ctx.request.body, schema);
  if (!error) {
    if(value.categoryId) {
      await Category.getCategoryById(value.categoryId); // check the presence of such a category
    }
    ctx.validBody = value; // added field "validBody" which contains the only necessary fields for this essence(Recipe)
    await next();
  } else {
    ctx.throw(400, error);
  }
};

module.exports = validation;