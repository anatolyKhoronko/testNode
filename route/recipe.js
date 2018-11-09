const Router = require('koa-router');
const Joi = require('joi');

const Recipe = require('../actions/Recipe');
const Category = require('../actions/Category');

const validation = ({ create = false }) => async(ctx, next) => {
  const schema = Joi.object().keys({
    name: create ? Joi.string().min(3).max(30).required() : Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(256),
    categoryId: create ? Joi.string().required() : Joi.string(),
  });
  const { error, value } = Joi.validate(ctx.request.body, schema);
  if (!error) {
    ctx.validBody = value; // added field "validBody" which contains the only necessary fields for this essence(Recipe)
    await next();
  } else {
    ctx.throw(400, error.message);
  }
};


const router = new Router({
  prefix: '/api/v1/recipe',
});

router.get('/', async(ctx) => {
  ctx.body = await Recipe.getAllRecipes();
});

router.post('/', validation({ create: true }), async(ctx) => {
  await Category.getCategoryById(ctx.validBody.categoryId); // check the presence of such a category
  ctx.body = await Recipe.createRecipe(ctx.validBody);
});

router.get('/:id', async(ctx) => {
  ctx.body = await Recipe.getRecipeById(ctx.params.id);
});

router.get('/:categoryId', async(ctx) => {
  ctx.body = await Recipe.getRecipesByCategoryId(ctx.params.categoryId);
});

router.put('/:id', validation({}), async(ctx) => {
  ctx.body = await Recipe.updateRecipe(ctx.params.id, ctx.validBody);
});

router.del('/:id', async(ctx)  => {
  ctx.body = await Recipe.deleteRecipe(ctx.params.id);
});

module.exports = router;