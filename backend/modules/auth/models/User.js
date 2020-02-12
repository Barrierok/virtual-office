import BaseModel from '../../../lib/BaseModel';

export default class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        createdAt: { type: 'date-time' },
        updatedAt: { type: 'date-time' },
      },
    };
  }
}
