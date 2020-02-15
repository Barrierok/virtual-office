exports.seed = (knex) => knex('tasks').del()
  .then(() => (knex('tasks').insert([
    {
      title: 'My awesome task',
      description: 'My awesome description',
      parentId: null,
      created_at: new Date().toISOString(),
    },
  ])));
