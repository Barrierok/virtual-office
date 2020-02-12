import _ from 'lodash';
import repositories from '../repositories';
import services from '../../auth/services';

const setUser = async (message) => {
  const usersService = new services.UsersService();
  const { username: author } = await usersService.getById(message.ownerId);
  return _.omit({ ...message, author }, 'ownerId');
};

const createResult = async (message) => ({
  data: {
    type: 'messages',
    id: message.id,
    attributes: await setUser(message),
  },
});

export default class MessagesService {
  constructor() {
    this.messagesRepository = new repositories.MessagesRepository();
  }

  async getAllMessages() {
    const messages = await this.messagesRepository.getAllMessages();
    return Promise.all(messages.map((m) => setUser(m)));
  }

  async getMessagesByChannelId(channelId) {
    const messages = await this.messagesRepository.getMessagesByChannelId(channelId);
    return Promise.all(messages.map((m) => createResult(m)));
  }

  async insertMessage(data) {
    const message = await this.messagesRepository.insertMessage(data);
    return createResult(message);
  }
}
