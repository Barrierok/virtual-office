exports.seed = (knex) => knex('columns').del()
  .then(() => (knex('columns').insert([
    {
      title: 'Активные',
      created_at: new Date().toISOString(),
    },
    {
      title: 'Выполняются',
      created_at: new Date().toISOString(),
    },
  ])));
