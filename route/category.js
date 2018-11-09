const Router = require('koa-router');

const Category = require('../actions/Category');
const validation = require('../validation/category');

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