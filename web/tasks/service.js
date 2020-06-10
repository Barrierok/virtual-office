import axios from 'axios';
import routes from './routes';

export const postColumn = async (attributes) => {
  const url = routes.columnsPath();
  await axios.post(url, { data: { attributes } });
};

export const removeColumn = async (id) => {
  const url = routes.columnPath(id);
  await axios.delete(url);
};

export const postTask = async (columnId, attributes) => {
  const url = routes.createTask(columnId);
  await axios.post(url, { data: { attributes } });
};

export const fetchUsers = async () => {
  const url = routes.usersPath();
  return await axios.get(url);
};

export const updateTask = async (taskId, attributes) => {
  const url = routes.taskPath(taskId);
  await axios.patch(url, { data: { attributes } });
};

export const updateColumn = async (columnId, attributes) => {
  const url = routes.columnPath(columnId);
  await axios.patch(url, { data: { attributes } });
};

export const removeTask = async (tasksId) => {
  const url = routes.taskPath(tasksId);
  await axios.delete(url);
};
