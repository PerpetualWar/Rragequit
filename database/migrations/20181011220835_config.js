exports.up = function(knex, Promise) {
  return knex.schema.createTable('config', table => {
    table.increments();
    table.string('guild_id').unique();
    table.string('guild_name');
    table.string('guild_channels');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('config');
};
