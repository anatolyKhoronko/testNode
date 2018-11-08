const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const _parse = require('../utils/_parse');

exports.init = app => {

  console.log(path.join(__dirname, '../', 'route'));
  if (fs.existsSync(path.join(__dirname, '../', 'route'))) {
    _parse(path.join(__dirname, '../', 'route'), (itemPath) => {

      const router = require(itemPath);
      if (router instanceof Router) {
        app.use(router.routes());
        app.use(router.allowedMethods());
      }
    });
  }
};

