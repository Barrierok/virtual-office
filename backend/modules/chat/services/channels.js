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

  async getChannels() {
    const result = await this.channelsRepository.getChannels();
    return result;
  }

  async insertChannel(data) {
    const insertedChannel = await this.channelsRepository.insertChannel(data);
    return createResult(insertedChannel);
  }

  async updateChannel(id, newData) {
    const updatedChannel = await this.channelsRepository.updateChannel(id, newData);
    return createResult(updatedChannel);
  }

  async deleteChannel(id) {
    const deletedChannel = await this.channelsRepository.deleteChannel(id);
    return createResult(deletedChannel);
  }
}
