import BaseModel from '../../../lib/BaseModel';

export default class Message extends BaseModel {
  static get tableName() {
    return 'messages';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text', 'author', 'channelId'],
      properties: {
        id: { type: 'integer' },
        author: { type: 'string', minLength: 1, maxLength: 100 },
        data: { type: 'string', minLength: 1, maxLength: 1000 },
        channelId: { type: 'integer' },
      },
    };
  }
}
