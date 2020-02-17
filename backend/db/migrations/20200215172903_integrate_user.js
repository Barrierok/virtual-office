
exports.up = (knex) => (
  knex.schema
    .table('tasks', (table) => {
      table
        .integer('owner_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .index();
    })
);

exports.down = (knex) => (
  knex.schema
    .table('tasks', (table) => {
      table.dropColumn('owner_id');
    })
);
