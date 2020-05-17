import { Model } from 'objection';

export default class UsersTasks extends Model {
  static get tableName() {
    return 'users_tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'taskId'],
      properties: {
        userId: { type: 'integer' },
        taskId: { type: 'integer' },
      },
    };
  }
}
