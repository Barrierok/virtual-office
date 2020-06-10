import models from '../models';

export default class TasksRepository {
  constructor() {
    this.model = models.Tasks;
  }

  getAllTasks() {
    return this.model.query().orderBy('createdAt');
  }

  getTasksByColumnId(id) {
    return this.model
      .query()
      .where('columnId', id)
      .orderBy('createdAt', 'DESC');
  }

  insertTask(data) {
    return this.model.query().insert(data).returning('*');
  }

  updateTask(id, newData) {
    const { users, ...rest } = newData;
    return this.model.query().findById(id).patch(rest).returning('*');
  }

  deleteTask(id) {
    return this.model.query().deleteById(id).returning('*');
  }
}
