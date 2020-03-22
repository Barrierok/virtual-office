import axios from 'axios';

import routes from './routes';

export const renameChannel = async ({ id, name }) => {
  const url = routes.channelPath(id);
  await axios.patch(url, { data: { attributes: { name } } });
};

export const removeChannel = async ({ id }) => {
  const url = routes.channelPath(id);
  await axios.delete(url);
};

export const addChannel = async ({ name }) => {
  const url = routes.channelsPath();
  await axios.post(url, { data: { attributes: { name } } });
};

export const addMessage = async ({ author, activeChannel, text }) => {
  const url = routes.channelMessagesPath(activeChannel);
  await axios.post(url, { data: { attributes: { author, text } } });
};
