import models from '../models';

export default class ColumnsRepository {
  constructor() {
    this.model = models.Columns;
  }

  getColumns() {
    return this.model.query().orderBy('createdAt');
  }

  insertColumn(data) {
    return this.model.query().insert(data).returning('*');
  }

  updateColumn(id, newData) {
    return this.model.query().findById(id).patch(newData).returning('*');
  }

  deleteColumn(id) {
    return this.model.query().deleteById(id).returning('*');
  }
}
