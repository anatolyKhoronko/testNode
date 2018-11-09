const Router = require('koa-router');
const Joi = require('joi');

const Article = require('../actions/Article');
const Category = require('../actions/Category');

const validation = ({ create = false }) => async(ctx, next) => {
  const schema = Joi.object().keys({
    name: create ? Joi.string().min(3).max(60).required() : Joi.string().min(3).max(60),
    description: Joi.string().min(3).max(1024),
    categoryId: create ? Joi.string().required() : Joi.string(),
  });
  const { error, value } = Joi.validate(ctx.request.body, schema);
  if (!error) {
    if(value.categoryId) {
      await Category.getCategoryById(value.categoryId); // check the presence of such a category
    }
    ctx.validBody = value; // added field "validBody" which contains the only necessary fields for this essence(Article)
    await next();
  } else {
    ctx.throw(400, error.message);
  }
};


const router = new Router({
  prefix: '/api/v1/article',
});

router.get('/', async(ctx) => {
  ctx.body = await Article.getAllItems();
});

router.post('/', validation({ create: true }), async(ctx) => {
  ctx.body = await Article.createItem(ctx.validBody);
});

router.get('/:id', async(ctx) => {
  ctx.body = await Article.getItemById(ctx.params.id);
});

router.get('/:categoryId', async(ctx) => {
  ctx.body = await Article.getItemsByCategoryId(ctx.params.categoryId);
});

router.put('/:id', validation({}), async(ctx) => {
  ctx.body = await Article.updateItem(ctx.params.id, ctx.validBody);
});

router.del('/:id', async(ctx)  => {
  ctx.body = await Article.deleteItem(ctx.params.id);
});

module.exports = router;