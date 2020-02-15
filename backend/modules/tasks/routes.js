import Router from 'koa-router';
import services from './services';
import authenticated from '../auth/utils';

export default (router, io) => {
  const tasksService = new services.TasksService();
  const apiRouter = new Router();

  apiRouter
    .get('/tasks', authenticated(), async (ctx) => {
      ctx.body = await tasksService.getTasks();
    })
    .post('/tasks', authenticated(), async (ctx) => {
      const { data: { attributes } } = ctx.request.body;
      const { title, description, parentId } = attributes;
      const { user } = ctx.state;
      const task = {
        title,
        description,
        parentId: Number(parentId),
        ownerId: user.id,
      };
      const data = await tasksService.insertTask(task);

      ctx.status = 201;
      ctx.body = data;
      io.emit('newTask', data);
    })
    .delete('/tasks/:id', authenticated(), async (ctx) => {
      const id = Number(ctx.params.id);
      const data = await tasksService.deleteTask(id);

      ctx.status = 204;
      io.emit('removeTask', data);
    })
    .patch('/tasks/:id', async (ctx) => {
      const feedId = Number(ctx.params.id);
      const { attributes } = ctx.request.body.data;
      const data = await tasksService.updateTask(feedId, attributes);

      ctx.status = 204;
      io.emit('updateTask', data);
    });

  return router
    .get('/tasks', authenticated(), async (ctx) => {
      const tasks = await tasksService.getChannels();
      const { username } = ctx.state.user;
      await ctx.render('tasks', {
        gon: {
          username,
          tasks,
        },
      });
    })
    .use('/api/v1/tasks', apiRouter.routes(), apiRouter.allowedMethods());
};
