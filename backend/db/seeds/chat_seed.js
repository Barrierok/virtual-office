exports.seed = (knex) =>
  knex('channels')
    .del()
    .then(() =>
      knex('channels').insert([
        {
          name: 'general',
          removable: false,
          created_at: new Date().toISOString(),
        },
        {
          name: 'random',
          removable: false,
          created_at: new Date().toISOString(),
        },
      ])
    );
