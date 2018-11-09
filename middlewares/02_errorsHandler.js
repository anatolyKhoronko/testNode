exports.init = app => app.use(async (ctx, next) => {
  try{
    await next();
  } catch(e) {
    if (e.customError) {
      const { statusCode, message } = e;
      ctx.throw(statusCode, message);
    }
    if(e.isJoi){
      const { details } = e;
      const messages = details.reduce((acc, { message }) =>{
        acc+=`${message}\n`;
        return acc;
      }, '');
      ctx.throw(400, messages);
    }

    if (e.code ==='E11000' || e.name === 'ValidationError' || e.name === 'MongoError' || e.message ) {
      ctx.throw(400, e.message);
    }
    ctx.throw(500, e.message);
  }
});
