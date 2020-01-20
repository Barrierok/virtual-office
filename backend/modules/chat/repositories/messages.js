import models from '../models';

export default class MessagesRepository {
  constructor() {
    this.model = models.Message;
  }

  async getMessagesByChannelId(id) {
    try {
      const messages = await this.model
        .query()
        .where('channelId', id);
      return messages;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async getAllMessages() {
    try {
      const messages = await this.model.query();
      return messages;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async insertMessage(data) {
    try {
      const message = await this.model
        .query()
        .insert(data)
        .returning('*');
      return message;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
