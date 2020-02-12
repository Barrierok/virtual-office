import BaseModel from '../../../lib/BaseModel';

export default class Message extends BaseModel {
  static get tableName() {
    return 'messages';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text', 'ownerId', 'channelId'],
      properties: {
        id: { type: 'integer' },
        data: { type: 'string', minLength: 1, maxLength: 1000 },
        channelId: { type: 'integer' },
        ownerId: { type: 'integer' },
        createdAt: { type: 'date-time' },
        updatedAt: { type: 'date-time' },
      },
    };
  }
}
