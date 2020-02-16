import { Model } from 'objection';
import User from '../../auth/models/User';

export default class Tasks extends Model {
  static get tableName() {
    return 'tasks';
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  static relationMappings = {
    movies: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'users.id',
        through: {
          from: 'users_tasks.userId',
          to: 'users_tasks.taskId',
        },
        to: 'tasks.id',
      },
    },
  };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'parentId', 'ownerId', 'status'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 5, maxLength: 100 },
        description: { type: 'string', minLength: 1, maxLength: 320 },
        status: { type: 'string', minLength: 1, maxLength: 32 },
        parentId: { type: ['integer', null] },
        ownerId: { type: 'integer' },
        createdAt: { type: 'date-time' },
        updatedAt: { type: 'date-time' },
      },
    };
  }
}
