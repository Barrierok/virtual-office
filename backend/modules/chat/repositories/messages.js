import repositories from '../models';

export default class MessagesRepository {
  constructor() {
    this.query = repositories.Message.query();
  }

  getMessagesByChannelId(id) {
    return this.query.where('channelId', id);
  }

  getAllMessages() {
    return this.query;
  }

  insertMessage(data) {
    return this.query.insert(data).returning('*');
  }
}
