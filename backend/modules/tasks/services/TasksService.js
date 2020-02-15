import repositories from '../repositories';

const createResult = (task) => ({
  data: {
    type: 'tasks',
    id: task.id,
    attributes: task,
  },
});

export default class TasksService {
  constructor() {
    this.tasksRepository = new repositories.TasksRepository();
  }

  async getTasks() {
    const result = await this.tasksRepository.getTasks();
    return result;
  }

  async insertTask(data) {
    const insertedTask = await this.tasksRepository.insertTask(data);
    return createResult(insertedTask);
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
