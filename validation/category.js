const Joi = require('joi');

const validation = ({ create = false }) => async(ctx, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(256),
    parentId: Joi.string(),
  });
  if (create) {
    schema.name = Joi.string().min(3).max(30).required();
  }
  const { error, value } = Joi.validate(ctx.request.body, schema);
  if (!error) {
    ctx.validBody = value; // added field "validBody" which contains the only necessary fields for this essence(Category)
    await next();
  } else {
    console.log(JSON.stringify(error));
    ctx.throw(400, error);
  }
};

module.exports = validation;