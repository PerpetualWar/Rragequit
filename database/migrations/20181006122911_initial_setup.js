exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('guilds', table => {
      table
        .string('guild_id')
        .unique()
        .primary();
      table.string('guild_name');
      table.timestamps();
    }),
    knex.schema.createTable('channels', table => {
      table
        .string('channel_id')
        .unique()
        .primary();
      table.string('channel_name');
      table
        .string('guild_id')
        .references('guild_id')
        .inTable('guilds')
        .onDelete('cascade');
      table.timestamps();
    }),
    knex.schema.createTable('gametypes', table => {
      table.increments('gametype_id').primary();
      table.string('gametype_name');
      table.integer('number_of_players');
      table.string('pickup_name');
      table
        .string('channel_id')
        .references('channel_id')
        .inTable('channels')
        .onDelete('cascade');
      table.timestamps();
    }),
    knex.schema.createTable('players', table => {
      table
        .string('user_id')
        .unique()
        .primary();
      table.string('user_username');
      table.string('banned_reason');
      table.bigInteger('banned_expires_in');
      table.string('muted_reason');
      table.bigInteger('muted_expires_in');
      table.timestamps();
    }),
    knex.schema.createTable('matches', table => {
      table.increments();
      table
        .string('user_id')
        .references('user_id')
        .inTable('players')
        .onDelete('cascade');
      table
        .string('guild_id')
        .references('guild_id')
        .inTable('guilds')
        .onDelete('cascade');
      table
        .string('channel_id')
        .references('channel_id')
        .inTable('channels')
        .onDelete('cascade');
      table
        .integer('gametype_id')
        .references('gametype_id')
        .inTable('gametypes')
        .onDelete('cascade');
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('matches'),
    knex.schema.dropTable('players'),
    knex.schema.dropTable('gametypes'),
    knex.schema.dropTable('channels'),
    knex.schema.dropTable('guilds'),
  ]);
};
