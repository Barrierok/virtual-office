import models from '../models';

export default class MessagesRepository {
  constructor() {
    this.model = models.Message;
  }

  getMessagesByChannelId(id) {
    return this.model
      .query()
      .where('channelId', id)
      .orderBy('createdAt', 'DESC');
  }

  getAllMessages() {
    return this.model.query().orderBy('createdAt');
  }

  insertMessage(data) {
    return this.model.query().insert(data).returning('*');
  }
}
