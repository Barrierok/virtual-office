
exports.up = (knex) => (
  knex.schema
    .createTable('feeds', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('body');
      table.string('author');
      table.boolean('archieve');
      table.datetime('created_at');
    })
);

exports.down = (knex) => (
  knex.schema
    .dropTableIfExists('feeds')
);
