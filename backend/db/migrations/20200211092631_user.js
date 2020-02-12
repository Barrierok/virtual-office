
exports.up = (knex) => (
  knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique();
      table.string('password');
      table.datetime('created_at');
      table.datetime('updated_at');
    })
);

exports.down = (knex) => (
  knex.schema
    .dropTableIfExists('users')
);
