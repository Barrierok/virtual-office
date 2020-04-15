exports.up = (knex) =>
  knex.schema.createTable('users_tasks', (table) => {
    table.integer('user_id');
    table.integer('task_id');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('users_tasks');
