import models from '../models';

export default class FeedsRepository {
  constructor() {
    this.model = models.Feed;
  }

  async getFeeds() {
    try {
      const feeds = await this.model.query();
      return feeds;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async insertFeed(data) {
    try {
      const feed = await this.model
        .query()
        .insert(data)
        .returning('*');
      return feed;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async updateFeed(id, newData) {
    try {
      const feed = await this.model
        .query()
        .findById(id)
        .patch(newData)
        .returning('*');
      return feed;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async deleteFeed(id) {
    try {
      const feed = await this.model
        .query()
        .findById(id)
        .delete()
        .returning('*');
      return feed;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
