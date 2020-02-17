const host = '';
const prefix = 'api/v1/tasksManager';

export default {
  tasksPath: () => [host, prefix, 'tasks'].join('/'),
  taskPath: (id) => [host, prefix, 'tasks', id].join('/'),
};
