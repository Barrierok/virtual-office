import repositories from '../models';

export default class ChannelsRepository {
  constructor() {
    this.query = repositories.Channel.query();
  }

  getChannels() {
    return this.query;
  }

  insertChannel(data) {
    return this.query.insert(data).returning('*');
  }

  updateChannel(id, newData) {
    return this.query.findById(id).patch(newData).returning('*');
  }

  deleteChannel(id) {
    return this.query.findById(id).delete().returning('*');
  }
}
