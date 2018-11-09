exports.init = app => app.use(async (ctx, next) => {
  try{
    await next();
  } catch(e) {
    if (e.customError) {
      const { statusCode, message } = e;
      ctx.throw(statusCode, message);
    }
    if (e.code ==='E11000' || e.name === 'ValidationError' || e.name === 'MongoError' ) {
      ctx.throw(400, e.message);
    }
    ctx.throw(500, e.message);
  }
});
