const Router = require('koa-router');
const Joi = require('joi');

const Category = require('../actions/Category');

const validation = ({ create = false }) => async(ctx, next) => {
  const schema = Joi.object().keys({
    name: create ? Joi.string().min(3).max(30).required() : Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(256),
    parentId: Joi.string(),
  });
  const { error, value } = Joi.validate(ctx.request.body, schema);
  if (!error) {
    ctx.validBody = value; // added field "validBody" which contains the only necessary fields for this essence(Category)
    await next();
  } else {
    ctx.throw(400, error.message);
  }
};


const router = new Router({
  prefix: '/api/v1/category',
});

router.get('/', async(ctx) => {
  ctx.body = await Category.getCategories();
});

router.post('/', validation({ create: true }), async(ctx) => {
  ctx.body = await Category.createCategory(ctx.validBody);
});

router.get('/:id', async(ctx) => {
  ctx.body = await Category.getCategoryById(ctx.params.id);
});

router.put('/:id', validation({}), async(ctx) => {
  ctx.body = await Category.updateCategory(ctx.params.id, ctx.validBody);
});

router.del('/:id', async(ctx)  => {
 ctx.body = await Category.deleteCategory(ctx.params.id);
});

module.exports = router;