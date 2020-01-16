import repositories from '../models';

export default class ChannelsRepository {
  constructor() {
    this.query = repositories.Channel.query();
  }

  async getChannels() {
    try {
      const channels = await this.query;
      return channels;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async insertChannel(data) {
    try {
      const channel = await this.query.insert(data).returning('*');
      return channel;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async updateChannel(id, newData) {
    try {
      const channel = await this.query.findById(id).patch(newData).returning('*');
      return channel;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async deleteChannel(id) {
    try {
      const channel = await this.query.findById(id).delete().returning('*');
      return channel;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
