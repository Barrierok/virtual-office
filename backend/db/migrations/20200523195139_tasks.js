exports.up = (knex) =>
  knex.schema
    .createTable('columns', (table) => {
      table.increments('id').primary();
      table.string('title').unique();
      table.datetime('created_at');
      table.datetime('updated_at');
    })
    .createTable('tasks', (table) => {
      table.increments('id').primary();
      table.string('title').unique();
      table.text('description');
      table.datetime('created_at');
      table.datetime('updated_at');
      table
        .integer('column_id')
        .unsigned()
        .references('id')
        .inTable('columns')
        .onDelete('CASCADE')
        .index();
      table
        .integer('owner_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .index();
    })
    .createTable('users_tasks', (table) => {
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('columns')
        .index();
      table
        .integer('task_id')
        .unsigned()
        .references('id')
        .inTable('tasks')
        .index();
    });

exports.down = (knex) =>
  knex.schema
    .dropTableIfExists('users_tasks')
    .dropTableIfExists('tasks')
    .dropTableIfExists('columns');
