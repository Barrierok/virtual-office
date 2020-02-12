
exports.up = (knex) => (
  knex.schema
    .createTable('channels', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.boolean('removable');
      table.datetime('created_at');
      table.datetime('updated_at');
    })
    .createTable('messages', (table) => {
      table.increments('id').primary();
      table.string('text');
      table.string('author');
      table.datetime('created_at');
      table.datetime('updated_at');
      table
        .integer('channel_id')
        .unsigned()
        .references('id')
        .inTable('channels')
        .onDelete('CASCADE')
        .index();
    })
);

exports.down = (knex) => (
  knex.schema
    .dropTableIfExists('messages')
    .dropTableIfExists('channels')
);
