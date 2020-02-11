import passport from 'koa-passport';

export default (router) => router
  .get('/login', async (ctx) => {
    await ctx.render('login');
  })
  .get('/register', async (ctx) => {
    await ctx.render('register');
  })
  .get('/logout', (ctx) => {
    ctx.logout();
    ctx.redirect('/login');
  })
  .post('/login', passport.authenticate('local', {
    successRedirect: '/chat',
    failureRedirect: '/login',
  }));
