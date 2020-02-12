export default () => (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next();
  }
  return ctx.redirect('/login');
};
