import repositories from '../models';

export default class MessagesRepository {
  constructor() {
    this.query = repositories.Message.query();
  }

  async getMessagesByChannelId(id) {
    try {
      const messages = await this.query.where('channelId', id);
      return messages;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async getAllMessages() {
    try {
      const messages = await this.query;
      return messages;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async insertMessage(data) {
    try {
      const message = await this.query.insert(data).returning('*');
      return message;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
