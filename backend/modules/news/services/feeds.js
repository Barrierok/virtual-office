import repositoreis from '../repositories';

const createResult = feed => ({
  data: {
    type: 'feeds',
    id: feed.id,
    attributes: feed,
  },
});

export default class FeedService {
  constructor() {
    this.feedsRepository = new repositoreis.FeedsRepository();
  }

  async getFeeds() {
    const result = await this.feedsRepository.getFeeds();
    return result;
  }

  async insertFeed(data) {
    const insertedFeed = await this.feedsRepository.insertFeed(data);
    return createResult(insertedFeed);
  }

  async updateFeed(id, newData) {
    const updatedFeed = await this.feedsRepository.updateFeed(id, newData);
    return createResult(updatedFeed);
  }

  async deleteFeed(id) {
    const deletedFeed = await this.feedsRepository.deleteFeed(id);
    return createResult(deletedFeed);
  }
}
