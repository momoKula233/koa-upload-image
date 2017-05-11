const koa = require('koa');
const kbody = require('koa-body');
const kstatic = require('koa-static');
const views = require('koa-views');
const Router = require('koa-router');
const routes = new Router();

const api = require('./api').routes();
const PORT = 3300;

const app = new koa();

// app.use(views(`${__dirname}/views`, { extension: 'html' }))

app.use(routes.routes());
app.use(kbody());
app.use(api);
app.use(kstatic(`${__dirname}/assests`));
app.listen(PORT, ()=> console.log(`http connected on ${PORT}`));