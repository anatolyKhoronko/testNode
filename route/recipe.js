const Router = require('koa-router');

const Recipe = require('../actions/Recipe');
const Category = require('../actions/Category');
const validation = require('../validation/recipe');

const router = new Router({
  prefix: '/api/v1/recipe',
});

router.get('/', async(ctx) => {
  ctx.body = await Recipe.getAllItems();
});

router.post('/', validation({ create: true }), async(ctx) => {
  ctx.body = await Recipe.createItem(ctx.validBody);
});

router.get('/:id', async(ctx) => {
  ctx.body = await Recipe.getItemById(ctx.params.id);
});

router.get('/:categoryId', async(ctx) => {
  ctx.body = await Recipe.getItemsByCategoryId(ctx.params.categoryId);
});

router.put('/:id', validation({}), async(ctx) => {
  ctx.body = await Recipe.updateItem(ctx.params.id, ctx.validBody);
});

router.del('/:id', async(ctx)  => {
  ctx.body = await Recipe.deleteItem(ctx.params.id);
});

module.exports = router;