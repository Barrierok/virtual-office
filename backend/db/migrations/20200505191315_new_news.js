
exports.down = (knex) => (
  knex.schema
    .table('feeds', (table) => {
      table
        .text('body');
    })
);

exports.up = (knex) => (
  knex.schema
    .table('feeds', (table) => {
      table.dropColumn('body');
    })
    .table('feeds', (table) => {
      table
        .text('body');
    })
);
