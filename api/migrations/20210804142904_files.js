
exports.up = function(knex) {
  return knex.schema.createTable('files', table => {
    table.increments('id');
    table.string('question').notNullable();
    table.string('answers').notNullable();
    table.string('title').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('files');
};
