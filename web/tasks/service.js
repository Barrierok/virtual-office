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
