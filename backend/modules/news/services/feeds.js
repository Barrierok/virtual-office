import _ from 'lodash';
import repositoreis from '../repositories';
import services from '../../auth/services';

const setUser = async (feed) => {
  const usersService = new services.UsersService();
  const { username: author } = await usersService.getById(feed.ownerId);
  return _.omit({ ...feed, author }, 'ownerId');
};

const createResult = async (feed) => ({
  data: {
    type: 'feeds',
    id: feed.id,
    attributes: await setUser(feed),
  },
});

export default class FeedService {
  constructor() {
    this.feedsRepository = new repositoreis.FeedsRepository();
  }

  async geAllFeeds() {
    const feeds = await this.feedsRepository.getAllFeeds();
    return Promise.all(feeds.map((f) => setUser(f)));
  }

  async getFeedsByCollectionId(collectionId) {
    const feeds = await this.feedsRepository.getFeedsByCollectionId(collectionId);
    return Promise.all(feeds.map((f) => createResult(f)));
  }

  async insertFeed(data) {
    const feed = await this.feedsRepository.insertFeed(data);
    return createResult(feed);
  }

  async updateFeed(id, newData) {
    const feed = await this.feedsRepository.updateFeed(id, newData);
    return createResult(feed);
  }

  async deleteFeed(id) {
    const feed = await this.feedsRepository.deleteFeed(id);
    return createResult(feed);
  }
}
