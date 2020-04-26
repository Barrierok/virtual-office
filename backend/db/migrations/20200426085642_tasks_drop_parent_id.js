exports.up = (knex) =>
  knex.schema.table("tasks", (table) => {
    table.dropColumn("parent_id");
  });

exports.down = (knex) =>
  knex.schema.table("tasks", (table) => {
    table
      .integer("parent_id")
      .unsigned()
      .references("tasks.id")
      .onDelete("CASCADE")
      .index();
  });
