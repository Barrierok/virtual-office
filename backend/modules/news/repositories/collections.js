import models from '../models';

export default class CollectionsRepository {
  constructor() {
    this.model = models.Collection;
  }

  getCollections() {
    return this.model.query().orderBy('createdAt');
  }

  insertCollection(data) {
    return this.model.query().insert(data).returning('*');
  }

  updateCollection(id, newData) {
    return this.model
      .query()
      .findById(id)
      .patch(newData)
      .returning('*');
  }

  async deleteCollection(id) {
    return this.model.query().deleteById(id).returning('*');
  }
}
