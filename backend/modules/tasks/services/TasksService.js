import _ from 'lodash';
import repositories from '../repositories';
import services from '../../auth/services';

const setUser = async (task) => {
  const usersService = new services.UsersService();
  const { username: author } = await usersService.getById(task.ownerId);
  return _.omit({ ...task, author }, 'ownerId');
};

const createResult = async (task) => ({
  data: {
    type: 'tasks',
    id: task.id,
    attributes: await setUser(task),
  },
});

export default class TasksService {
  constructor() {
    this.tasksRepository = new repositories.TasksRepository();
  }

  async getAllTasks() {
    const tasks = await this.tasksRepository.getAllTasks();
    return Promise.all(tasks.map((t) => setUser(t)));
  }

  async getTasksByColumnId(columnId) {
    const tasks = await this.tasksRepository.getTasksByColumnId(columnId);
    return Promise.all(tasks.map((i) => createResult(i)));
  }

  async insertTask(data) {
    const insertedTask = await this.tasksRepository.insertTask(data);
    return await createResult(insertedTask);
  }

  async updateTask(id, newData) {
    const updatedTask = await this.tasksRepository.updateTask(id, newData);
    return createResult(updatedTask);
  }

  async deleteTask(id) {
    const deletedTask = await this.tasksRepository.deleteTask(id);
    return createResult(deletedTask);
  }
}
