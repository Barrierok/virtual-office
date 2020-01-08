import { Model } from 'objection';

export default class Channel extends Model {
  static get tableName() {
    return 'channels';
  }

  static jsonSchema() {
    return {
      type: 'object',
      required: ['removable', 'name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        removable: { type: 'boolean' },
      },
    };
  }
}
