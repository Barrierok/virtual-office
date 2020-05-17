exports.up = (knex) =>
  knex.schema.createTable('columns', (table) => {
    table.increments('id').primary();
    table.string('title').unique();
    table.datetime('created_at');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('columns');
