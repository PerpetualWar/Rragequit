exports.up = function(knex, Promise) {
  return knex.schema.createTable('guilds', table => {
    table.increments();
    table.string('guild_id').unique();
    table.string('guild_name');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('guilds');
};
