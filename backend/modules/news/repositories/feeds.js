import models from '../models';

export default class FeedsRepository {
  constructor() {
    this.model = models.Feed;
  }

  getFeedsByCollectionId(id) {
    return this.model
      .query()
      .where('collectionId', id)
      .orderBy('createdAt', 'DESC');
  }

  async getAllFeeds() {
    return this.model.query().orderBy('createdAt', 'DESC');
  }

  async insertFeed(data) {
    return this.model.query().insert(data).returning('*');
  }

  async updateFeed(id, newData) {
    return this.model.query().findById(id).patch(newData).returning('*');
  }

  async deleteFeed(id) {
    return this.model.query().deleteById(id).returning('*');
  }
}
