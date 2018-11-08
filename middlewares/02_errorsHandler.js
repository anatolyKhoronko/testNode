exports.init = app => app.use(async (ctx, next) => {
  try{
    await next();
  } catch(e) {
    if(e.customError) {
      const { statusCode, message } = e;
      ctx.body = { error: true, message };
      ctx.statusCode = statusCode;
      return;
    }
    ctx.throw(e);
  }
});
