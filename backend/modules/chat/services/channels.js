import repositories from '../repositories';

const createResult = channel => ({
  data: {
    type: 'channels',
    id: channel.id,
    attributes: channel,
  },
});

export default class ChannelsService {
  constructor() {
    this.channelsRepository = new repositories.ChannelsRepository();
  }

  getChannels() {
    return this.channelsRepository.getChannels();
  }

  insertChannel(data) {
    const insertedChannel = this.channelsRepository.insertChannel(data);

    return createResult(insertedChannel);
  }

  updateChannel(id, newData) {
    const updatedChannel = this.channelsRepository.updateChannel(id, newData);

    return createResult(updatedChannel);
  }

  deleteChannel(id) {
    const deletedChannel = this.channelsRepository.deleteChannel(id);

    return createResult(deletedChannel);
  }
}
