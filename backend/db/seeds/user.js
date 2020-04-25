exports.seed = (knex) =>
  knex('users')
    .del()
    .then(() => knex('users').insert([{ username: 'root', password: 'root' }]));
