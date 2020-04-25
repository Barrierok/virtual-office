import models from '../models';

export default class ChannelsRepository {
  constructor() {
    this.model = models.Channel;
  }

  getChannels() {
    return this.model.query().orderBy('createdAt');
  }

  insertChannel(data) {
    return this.model.query().insert(data).returning('*');
  }

  updateChannel(id, newData) {
    return this.model.query().findById(id).patch(newData).returning('*');
  }

  async deleteChannel(id) {
    return this.model.query().deleteById(id).returning('*');
  }
}
