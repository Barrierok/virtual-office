exports.seed = (knex) =>
  knex('users')
    .del()
    .then(() =>
      knex('users').insert([
        { username: 'Alexander Koliukh', password: 'root' },
        { username: 'Ilya Zubtsov', password: 'root' },
        { username: 'Pavel Derugin', password: 'root' },
      ])
    );
