import models from '../models';

export default class TasksRepository {
  constructor() {
    this.model = models.Tasks;
  }

  getTasks() {
    return this.model.query().orderBy('createdAt');
  }

  insertTask(data) {
    return this.model.query().insert(data).returning('*');
  }

  updateTask(id, newData) {
    return this.model.query().findById(id).patch(newData).returning('*');
  }

  deleteTask(id) {
    return this.model.query().deleteById(id).returning('*');
  }
}
