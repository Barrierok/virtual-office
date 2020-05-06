exports.seed = (knex) =>
  knex('tasks')
    .del()
    .then(() =>
      knex('tasks').insert([
        {
          title: 'My awesome task active',
          description: 'My awesome description',
          parent_id: null,
          created_at: new Date().toISOString(),
          status: 'active',
        },
        {
          title: 'Тестовое задание со статус выполняется',
          description: 'My awesome description',
          parent_id: null,
          created_at: new Date().toISOString(),
          status: 'inProgress',
        },
      ])
    );
