import repositories from '../repositories';

const createResult = message => ({
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

  getAllMessages() {
    return this.messagesRepository.getAllMessages();
  }

  getMessagesByChannelId(channelId) {
    const messages = this.messagesRepository.getMessagesByChannelId(channelId);

    return messages.map(m => createResult(m));
  }

  insertMessage(data) {
    const message = this.messagesRepository.insertMessage(data);

    return createResult(message);
  }
}
