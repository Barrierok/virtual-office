import models from '../models';

export default class ChannelsRepository {
  constructor() {
    this.model = models.Channel;
  }

  async getChannels() {
    try {
      const channels = await this.model.query().orderBy('createdAt');
      return channels;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async insertChannel(data) {
    try {
      const channel = await this.model
        .query()
        .insert(data)
        .returning('*');
      return channel;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async updateChannel(id, newData) {
    try {
      const channel = await this.model
        .query()
        .findById(id)
        .patch(newData)
        .returning('*');
      return channel;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async deleteChannel(id) {
    try {
      const channel = await this.model
        .query()
        .deleteById(id)
        .returning('*');
      return channel;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
