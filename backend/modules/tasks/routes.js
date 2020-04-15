import Router from 'koa-router';
import services from './services';
import authenticated from '../auth/utils';

export default (router, io) => {
  const tasksService = new services.TasksService();
  const columnsService = new services.ColumnsService();
  const apiRouter = new Router();

  apiRouter
    .get('/columns', authenticated(), async (ctx) => {
      ctx.body = await columnsService.getColumns();
    })
    .post('/columns', authenticated(), async (ctx) => {
      const {
        data: { attributes },
      } = ctx.request.body;
      const { title } = attributes;
      const column = {
        title,
      };
      const data = await columnsService.insertColumn(column);

      ctx.status = 201;
      ctx.body = data;
      io.emit('newColumn', data);
    })
    .delete('/column/:id', authenticated(), async (ctx) => {
      const id = Number(ctx.params.id);
      const data = await columnsService.deleteColumn(id);

      ctx.status = 204;
      io.emit('removeColumn', data);
    })
    .get('columns/tasks', authenticated(), async (ctx) => {
      ctx.body = await tasksService.getAllTasks();
    });

  return router
    .get('/tasks', authenticated(), async (ctx) => {
      const columns = await columnsService.getColumns();
      const tasks = await tasksService.getAllTasks();
      const { username } = ctx.state.user;
      await ctx.render('tasks', {
        gon: {
          username,
          tasks,
          columns,
        },
      });
    })
    .use('/api/v1/tasks', apiRouter.routes(), apiRouter.allowedMethods());
};
