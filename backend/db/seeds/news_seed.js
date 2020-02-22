
exports.seed = (knex) => knex('feeds').del()
  .then(() => (knex('feeds').insert([
    {
      title: 'Hello, dude', body: 'Example post for testing app', author: 'Pavel', archieve: false, created_at: '2019-01-13 23:12:11',
    },
  ])));
