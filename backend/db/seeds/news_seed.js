exports.seed = (knex) =>
  knex('feeds')
    .del()
    .then(() =>
      knex('feeds').insert([
        {
          title: 'Hello, dude',
          body: 'Example post for testing app',
          author: 'Pavel Derugin',
          archieve: false,
          created_at: '2019-01-13 23:12:11',
        },
      ])
    );

exports.seed = (knex) =>
  knex('feeds')
    .del()
    .then(() =>
      knex('collections').insert([
        {
          name: 'main',
          removable: false,
          created_at: new Date().toISOString(),
        },
      ])
    );
