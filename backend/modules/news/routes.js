import Router from 'koa-router';
import services from './services';
import authenticated from '../auth/utils';

export default (router, io) => {
  const collectionsService = new services.CollectionsService();
  const feedsService = new services.FeedsService();
  const apiRouter = new Router();

  apiRouter
    .get('/collections', authenticated(), async (ctx) => {
      ctx.body = await collectionsService.getCollections();
    })
    .post('/collections', authenticated(), async (ctx) => {
      const {
        data: {
          attributes: { name },
        },
      } = ctx.request.body;
      const { user } = ctx.state;
      const collection = {
        name,
        removable: true,
        ownerId: user.id,
      };
      const data = await collectionsService.insertCollection(collection);

      ctx.status = 201;
      ctx.body = data;
      io.emit('newCollection', data);
    })
    .delete('/collections/:id', authenticated(), async (ctx) => {
      const collectionId = Number(ctx.params.id);
      const data = await collectionsService.deleteCollection(collectionId);

      ctx.status = 204;
      io.emit('removeCollection', data);
    })
    .patch('/collections/:id', async (ctx) => {
      const collectionId = Number(ctx.params.id);
      const { attributes } = ctx.request.body.data;
      const data = await collectionsService.updateCollection(
        collectionId,
        attributes
      );

      ctx.status = 204;
      io.emit('renameCollection', data);
    })
    .get('/feeds', authenticated(), async (ctx) => {
      ctx.body = await feedsService.geAllFeeds();
    })
    .get('/collections/:collectionId/feeds', authenticated(), async (ctx) => {
      const collectionId = Number(ctx.params.collectionId);
      const resources = await feedsService.getFeedsByCollectionId(collectionId);

      ctx.body = resources;
    })
    .post('/collections/:collectionId/feeds', authenticated(), async (ctx) => {
      const {
        data: { attributes },
      } = ctx.request.body;
      const { user } = ctx.state;
      const feed = {
        ...attributes,
        ownerId: user.id,
        collectionId: Number(ctx.params.collectionId),
      };
      const data = await feedsService.insertFeed(feed);

      ctx.status = 201;
      ctx.body = data;
      io.emit('addFeed', data);
    })
    .patch('/collections/:collectionId/feeds/:id', authenticated(), async (ctx) => {
      const feedId = Number(ctx.params.id);
      const { attributes } = ctx.request.body.data;
      const data = await feedsService.updateFeed(feedId, attributes);

      ctx.status = 201;
      io.emit('updateFeed', data);
    })
    .delete('/collections/:collectionId/feeds/:id', authenticated(), async (ctx) => {
      const feedId = Number(ctx.params.id);
      const data = await feedsService.deleteFeed(feedId);

      ctx.status = 204;
      io.emit('removeFeed', data);
    });

  return router
    .get('/news', authenticated(), async (ctx) => {
      const collections = await collectionsService.getCollections();
      const feeds = await feedsService.geAllFeeds();
      const { username } = ctx.state.user;
      await ctx.render('news', {
        gon: {
          username,
          collections,
          feeds,
          currentCollectionId: collections[0].id,
        },
      });
    })
    .use('/api/v1/news', apiRouter.routes(), apiRouter.allowedMethods());
};
