
exports.up = (knex) => (
  knex.schema
    .table('collections', (table) => {
      table
        .integer('owner_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .index();
    })
    .table('feeds', (table) => {
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
    .table('feeds', (table) => {
      table.dropColumn('owner_id');
    })
    .table('collections', (table) => {
      table.dropColumn('owner_id');
    })
);
