const fs = require('fs');
const path = require('path');

const _parse = (initPath, callback) => {

  fs.readdirSync(initPath).forEach((name) => {

    let itemPath = path.join(initPath, name)
      , stat = fs.statSync(itemPath);

    if (stat && stat.isDirectory(itemPath)) {
      _parse(itemPath, callback);

    } else {
      callback(itemPath);
    }

  });
};

module.exports = _parse;

