
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', function(table){
    table.increments();
    table.string('title').notNullable();
    table.boolean('is_complete').defaultTo(false);
    table.integer('user_id').references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks');
};
