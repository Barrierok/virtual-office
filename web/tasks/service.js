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

export const postTask = async (id, attributes) => {
  const url = routes.createTask(id);
  await axios.post(url, { data: { attributes } });
};

export const fetchUsers = async () => {
  const url = routes.usersPath();
  return await axios.get(url);
};
