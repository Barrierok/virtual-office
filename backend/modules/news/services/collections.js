import repositories from '../repositories';

const createResult = (collection) => ({
  data: {
    type: 'collections',
    id: collection.id,
    attributes: collection,
  },
});

export default class ColletionsService {
  constructor() {
    this.collectionsRepository = new repositories.CollectionsRepository();
  }

  async getCollections() {
    const result = await this.collectionsRepository.getCollections();
    return result;
  }

  async insertCollection(data) {
    const insertedCollection = await this.collectionsRepository.insertCollection(
      data
    );
    return createResult(insertedCollection);
  }

  async updateCollection(id, newData) {
    const updatedCollection = await this.collectionsRepository.updateCollection(
      id,
      newData
    );
    return createResult(updatedCollection);
  }

  async deleteCollection(id) {
    const deletedCollection = await this.collectionsRepository.deleteCollection(
      id
    );
    return createResult(deletedCollection);
  }
}
