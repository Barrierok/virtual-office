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
    return this.model.query().orderBy('createdAt');
  }

  async insertFeed(data) {
    return this.model.query().insert(data).returning('*');
  }

  async updateFeed(id, newData) {
    return this.model.query().findBy(id).patch(newData).returning('*');
  }

  async deleteFeed(id) {
    return this.model.query().findBy(id).delete().returning('*');
  }
}
