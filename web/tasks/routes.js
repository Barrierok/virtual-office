const host = '';
const prefix = 'api/v1/tasks';

export default {
  columnsPath: () => [host, prefix, 'columns'].join('/'),
  columnPath: (id) => [host, prefix, 'column', id].join('/'),
  createTask: (id) => [host, prefix, 'columns', id, 'task'].join('/'),
};
