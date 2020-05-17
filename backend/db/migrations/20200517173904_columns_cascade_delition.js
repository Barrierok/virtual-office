exports.up = (knex) =>
  knex.schema.table('tasks', (table) => {
    table
      .integer('column_id')
      .unsigned()
      .references('id')
      .inTable('columns')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .index();
  });

exports.down = (knex) =>
  knex.schema.table('tasks', (table) => {
    table.dropColumn('column_id');
  });
