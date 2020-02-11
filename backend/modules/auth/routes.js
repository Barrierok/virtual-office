export default (router) => router
  .get('/login', async (ctx) => {
    await ctx.render('login');
  })
  .get('/register', async (ctx) => {
    await ctx.render('register');
  });
