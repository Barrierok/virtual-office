import { Model } from 'objection';
import BaseModel from '../../../lib/BaseModel';
import User from '../../auth/models/User';

export default class Tasks extends BaseModel {
  static get tableName() {
    return 'tasks';
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
      required: ['title', 'columnId', 'ownerId'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 100 },
        description: { type: 'string' },
        columnId: { type: 'integer' },
        ownerId: { type: 'integer' },
        users: { type: 'string' },
        createdAt: { type: 'date-time' },
        updatedAt: { type: 'date-time' },
      },
    };
  }
}
