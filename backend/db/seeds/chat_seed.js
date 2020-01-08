
exports.seed = knex => knex('channels').del()
  .then(() => (knex('channels').insert([
    { name: 'general', removable: false },
    { name: 'random', removable: false },
  ])));
