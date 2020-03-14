
exports.up = (knex) => (
  knex.schema
    .createTable('collections', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.boolean('removable');
      table.datetime('created_at');
      table.datetime('updated_at');
    })
    .createTable('feeds', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('body');
      table.string('author');
      table.boolean('archieve');
      table.datetime('created_at');
      table
        .integer('collection_id')
        .unsigned()
        .references('id')
        .inTable('collections')
        .onDelete('CASCADE')
        .index();
    })
);

exports.down = (knex) => (
  knex.schema
    .dropTableIfExists('feeds')
    .dropTableIfExists('collections')
);
