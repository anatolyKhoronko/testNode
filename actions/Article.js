const ArticleModel = require('../db/models/article');
const CategoryIem = require('./CategoryItem');

class Article extends CategoryIem {
  constructor(){
    super(ArticleModel)
  }
}

module.exports = new Article();