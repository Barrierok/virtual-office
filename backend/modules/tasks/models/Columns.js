import { Model } from 'objection';
import BaseModel from '../../../lib/BaseModel';
import Tasks from './Tasks';

export default class Columns extends BaseModel {
  static get tableName() {
    return 'columns';
  }

  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: Tasks,
      join: {
        from: 'tasks.columnId',
        to: 'columns.id',
      },
    },
  };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 100 },
        createdAt: { type: 'date-time' },
      },
    };
  }
}
