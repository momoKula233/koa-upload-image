const Router = require('koa-router');
const path = require('path');

const api = new Router();
const { uploadFile } = require('./uploadHelper');


api.post('/api/upload', async(ctx) => {
  const serverPath = path.join(__dirname, 'assests/image');
  const result = await uploadFile(ctx, {
    fileType: 'album',
    path: serverPath,
  })
  ctx.body = result;
});

module.exports = api;