const host = '';
const prefix = 'api/v1/chat';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) =>
    [host, prefix, 'channels', id, 'messages'].join('/'),
};
