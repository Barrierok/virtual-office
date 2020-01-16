import Router from 'koa-router';
import services from './services';

export default (router, io) => {
  const channelsService = new services.ChannelsService();
  const messagesService = new services.MessagesService();
  const apiRouter = new Router();

  apiRouter
    .get('/channels', (ctx) => {
      ctx.body = channelsService.getChannels();
    })
    .post('/channels', (ctx) => {
      const { data: { attributes: { name } } } = ctx.request.body;
      const channel = {
        name,
        removable: true,
      };
      const data = channelsService.insertChannel(channel);

      ctx.status = 201;
      ctx.body = data;
      io.emit('newChannel', data);
    })
    .delete('/channels/:id', (ctx) => {
      const channelId = Number(ctx.params.id);
      const data = channelsService.deleteChannel(channelId);

      ctx.status = 204;
      io.emit('removeChannel', data);
    })
    .patch('channels/:id', (ctx) => {
      const channelId = Number(ctx.params.id);
      const { attributes } = ctx.request.body.data;
      const data = channelsService.updateChannel(channelId, attributes);

      ctx.status = 204;
      io.emit('renameChannel', data);
    })
    .get('/channels/:channelId/messages', (ctx) => {
      const channelId = Number(ctx.params.channelId);
      const resources = messagesService.getMessagesByChannelId(channelId);

      ctx.body = resources;
    })
    .post('/channels/:channelId/messages', (ctx) => {
      const { data: { attributes } } = ctx.request.body;
      const message = {
        ...attributes,
        channelId: Number(ctx.params.channelId),
      };
      const data = messagesService.insertMessage(message);

      ctx.status = 201;
      ctx.body = data;
      io.emit('newMessage', data);
    });

  return router
    .get('root', '/', (ctx) => {
      ctx.render('index', {
        gon: {
        },
      });
    })
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());
};
