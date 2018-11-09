const RecipeModel = require('../db/models/recipe');
const CategoryIem = require('./CategoryItem');

class Recipe extends CategoryIem {
 constructor(){
   super(RecipeModel)
 }
}

module.exports = new Recipe();