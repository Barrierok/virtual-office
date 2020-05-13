import repositories from '../repositories';

export default class UsersService {
  constructor() {
    this.usersRepository = new repositories.UsersRepository();
  }

  getById(id) {
    return this.usersRepository.getById(id);
  }

  getByUsername(username) {
    return this.usersRepository.getByUsername(username);
  }

  getAll() {
    return this.usersRepository.getAll();
  }

  insert(user) {
    return this.usersRepository.insert(user);
  }
}
