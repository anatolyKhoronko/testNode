const Router = require('koa-router');
const Joi = require('joi');

const Article = require('../actions/Article');
const Category = require('../actions/Category');
const validation = require('../validation/article');

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