import models from '../models';

export default class UserRepository {
  constructor() {
    this.model = models.User;
  }

  getById(id) {
    return this.model.query().findById(id);
  }

  getByUsername(username) {
    return this.model.query().findOne({ username });
  }

  insert(user) {
    return this.model.query().insert(user).returning('*');
  }
}
