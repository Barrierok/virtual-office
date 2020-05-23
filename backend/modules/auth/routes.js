import passport from 'koa-passport';
import UsersService from './services/users';

export default (router) => {
  const usersService = new UsersService();

  return router
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
    .post(
      '/login',
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
      })
    )
    .post('/register', async (ctx) => {
      const data = ctx.request.body;
      const user = await usersService.insert(data);
      if (user) {
        return ctx.redirect('/login');
      }
      return ctx.redirect('/register');
    })
    .get('/users', async (ctx) => {
      ctx.body = await usersService.getAll();
    });
};
