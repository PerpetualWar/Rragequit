exports.up = function(knex, Promise) {
  return knex.schema.createTable('added_players', table => {
    table.increments();
    table.string('discord_id').unique();
    table.string('discord_username');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('added_players');
};
