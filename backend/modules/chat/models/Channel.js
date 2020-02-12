import BaseModel from '../../../lib/BaseModel';

export default class Channel extends BaseModel {
  static get tableName() {
    return 'channels';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['removable', 'name', 'ownerId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        removable: { type: 'boolean' },
        ownerId: { type: 'integer' },
        createdAt: { type: 'date-time' },
        updatedAt: { type: 'date-time' },
      },
    };
  }
}
