import _ from 'lodash';
import repositories from '../repositories';
import services from '../../auth/services';

const setUser = async (task) => {
  const usersService = new services.UsersService();
  const { username: author } = await usersService.getById(task.ownerId);
  return _.omit({ ...task, author }, 'ownerId');
};

export default class UsersTasksService {
  constructor() {
    this.usersTasksRepository = new repositories.UsersTasksRepository();
  }

  async getUserTasks(userId) {
    const tasks = await this.usersTasksRepository.getUserTasks(userId);
    return Promise.all(tasks.map((t) => setUser(t)));
  }

  async insertUsersToTask(usersIds, taskId) {
    const data = usersIds.map((i) => ({
      user_id: i,
      task_id: taskId,
    }));

    return this.usersTasksRepository.insertUsersToTask(data);
  }
}
