import axios from 'axios';

import routes from './routes';

export const addCollection = async ({ name }) => {
  const url = routes.collectionsPath();
  await axios.post(url, { data: { attributes: { name } } });
};

export const removeCollection = async ({ id }) => {
  const url = routes.collectionsPath(id);
  await axios.delete(url);
};

export const renameCollection = async ({ id, name }) => {
  const url = routes.collectionsPath(id);
  await axios.patch(url, { data: { attributes: { name } } });
};

export const addFeed = async ({
  author, activeCollection, title, body,
}) => {
  const url = routes.collectionFeedsPath(activeCollection);
  await axios.post(url, { data: { attributes: { author, title, body } } });
};

export const removeFeed = async ({ collectionId, id }) => {
  const url = routes.feedsPath(collectionId, id);
  await axios.delete(url);
};

export const updateFeed = async ({
  collectionId, id, title, body,
}) => {
  const url = routes.feedsPath(collectionId, id);
  await axios.patch(url, { data: { attributes: { title, body } } });
};
