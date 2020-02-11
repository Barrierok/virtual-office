import repositories from '../repositories';

const createResult = (message) => ({
  data: {
    type: 'messages',
    id: message.id,
    attributes: message,
  },
});

export default class MessagesService {
  constructor() {
    this.messagesRepository = new repositories.MessagesRepository();
  }

  async getAllMessages() {
    const messages = await this.messagesRepository.getAllMessages();
    return messages;
  }

  async getMessagesByChannelId(channelId) {
    const messages = await this.messagesRepository.getMessagesByChannelId(channelId);
    return messages.map(m => createResult(m));
  }

  async insertMessage(data) {
    const message = await this.messagesRepository.insertMessage(data);
    return createResult(message);
  }
}
