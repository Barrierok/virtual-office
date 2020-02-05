import Router from 'koa-router';
import services from './services';

export default (router, io) => {
  const feedsService = new services.FeedsService();
  const apiRouter = new Router();

  apiRouter
    .get('/feeds', async (ctx) => {
      ctx.body = await feedsService.getFeeds();
    })
    .post('/feeds', async (ctx) => {
      const { data: { attributes: { title, body } } } = ctx.request.body;
      const feed = {
        title,
        body,
        archieve: false,
      };
      const data = await feedsService.insertFeed(feed);

      ctx.status = 201;
      ctx.body = data;
      io.emit('newFeed', data);
    })
    .delete('/feeds/:id', async (ctx) => {
      const feedId = Number(ctx.params.id);
      const data = await feedsService.deleteFeed(feedId);

      ctx.status = 204;
      io.emit('removeFeed', data);
    })
    .patch('/feeds/:id', async (ctx) => {
      const feedId = Number(ctx.params.id);
      const { attributes } = ctx.request.body.data;
      const data = await feedsService.updateFeed(feedId, attributes);

      ctx.status = 204;
      io.emit('renameFeed', data);
    });

  return router
    .get('root', '/', async (ctx) => {
      console.log(__dirname);
      await ctx.render('index', {
        gon: {
          feeds: await feedsService.getFeeds(),
        },
      });
    })
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());
};
