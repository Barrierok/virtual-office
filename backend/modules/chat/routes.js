import Router from 'koa-router';
import services from './services';

export default (router, io) => {
  const channelsService = new services.ChannelsService();
  const messagesService = new services.MessagesService();
  const apiRouter = new Router();

  apiRouter
    .get('/channels', async (ctx) => {
      ctx.body = await channelsService.getChannels();
    })
    .post('/channels', async (ctx) => {
      const { data: { attributes: { name } } } = ctx.request.body;
      const channel = {
        name,
        removable: true,
      };
      const data = await channelsService.insertChannel(channel);

      ctx.status = 201;
      ctx.body = data;
      io.emit('newChannel', data);
    })
    .delete('/channels/:id', async (ctx) => {
      const channelId = Number(ctx.params.id);
      const data = await channelsService.deleteChannel(channelId);

      ctx.status = 204;
      io.emit('removeChannel', data);
    })
    .patch('channels/:id', async (ctx) => {
      const channelId = Number(ctx.params.id);
      const { attributes } = ctx.request.body.data;
      const data = await channelsService.updateChannel(channelId, attributes);

      ctx.status = 204;
      io.emit('renameChannel', data);
    })
    .get('/channels/:channelId/messages', async (ctx) => {
      const channelId = Number(ctx.params.channelId);
      const resources = await messagesService.getMessagesByChannelId(channelId);

      ctx.body = resources;
    })
    .post('/channels/:channelId/messages', async (ctx) => {
      const { data: { attributes } } = ctx.request.body;
      const message = {
        ...attributes,
        channelId: Number(ctx.params.channelId),
      };
      const data = await messagesService.insertMessage(message);

      ctx.status = 201;
      ctx.body = data;
      io.emit('newMessage', data);
    });

  return router
    .get('root', '/', async (ctx) => {
      console.log(__dirname);
      await ctx.render('index', {
        gon: {
          channels: await channelsService.getChannels(),
          messages: await messagesService.getAllMessages(),
        },
      });
    })
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());
};
