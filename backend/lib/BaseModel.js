import { Model } from 'objection';

export default class BaseModel extends Model {
  $afterInsert() {
    console.log(`${this.constructor.name} instance created ${JSON.stringify(this)}`);
  }

  $afterUpdate() {
    console.log(`${this.constructor.name} instance updated: ${JSON.stringify(this)}`);
  }

  $afterDelete() {
    console.log(`${this.constructor.name} instance deleted: ${JSON.stringify(this)}`);
  }

  $afterFind() {
    console.log(`${this.constructor.name} instance selected: ${JSON.stringify(this)}`);
  }
}
