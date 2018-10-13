exports.up = function(knex, Promise) {
  return knex.schema.createTable('matches', table => {
    table.increments();
    table.string('discord_id').unique();
    table.string('discord_username');
    table
      .integer('guild_id')
      .unsigned()
      .references('guilds.id')
      .notNull()
      .onDelete('cascade');
    table
      .integer('channel_id')
      .unsigned()
      .references('channels.id')
      .notNull()
      .onDelete('cascade');
    table
      .integer('gamemode_id')
      .unsigned()
      .references('game_modes.id')
      .notNull()
      .onDelete('cascade');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('matches');
};
