const host = '';
const prefix = 'api/v1/news';

export default {
  newsPath: () => [host, prefix, 'news'].join('/'),
  collectionsPath: (id) => [host, prefix, 'collections', id].join('/'),
  collectionFeedsPath: (id) => [host, prefix, 'collections', id, 'feeds'].join('/'),
  feedsPath: (collectionId, id) => [host, prefix, 'collections', collectionId, 'feeds', id].join('/'),
};
