import models from '../models';

export default class UsersTasksRepository {
  constructor() {
    this.model = models.UsersTasks;
  }

  getUserTasks(userId) {
    return this.model.query().where('userId', userId);
  }
  getTaskUser(taskId) {
    return this.model.query().where('taskId', taskId);
  }

  insertUsersToTask(data) {
    return this.model.query().insert(data);
  }
}
