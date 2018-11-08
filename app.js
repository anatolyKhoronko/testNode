const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const app = new Koa();

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(middleware => require(`./middlewares/${middleware}`).init(app));
require('./db');

app.listen(3000, () => console.log('Server starting....'));
