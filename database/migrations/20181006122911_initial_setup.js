exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('guilds', table => {
      table
        .string('id')
        .unique()
        .primary();
      table.string('name');
      table.string('prefix');
      table.string('admin_role');
      table.timestamps();
    }),
    knex.schema.createTable('channels', table => {
      table
        .string('id')
        .unique()
        .primary();
      table.string('name');
      table
        .string('guild_id')
        .references('id')
        .inTable('guilds')
        .onDelete('cascade');
      table.timestamps();
    }),
    knex.schema.createTable('gametypes', table => {
      table
        .increments('id')
        .unique()
        .primary();
      table.string('name');
      table.integer('number_of_players');
      table
        .string('channel_id')
        .references('id')
        .inTable('channels')
        .onDelete('cascade');
      table.timestamps();
      table.unique(['name', 'channel_id']);
    }),
    knex.schema.createTable('players', table => {
      table
        .string('id')
        .unique()
        .primary();
      table.string('username');
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
        .references('id')
        .inTable('players')
        .onDelete('cascade');
      table
        .string('guild_id')
        .references('id')
        .inTable('guilds')
        .onDelete('cascade');
      table
        .string('channel_id')
        .references('id')
        .inTable('channels')
        .onDelete('cascade');
      table
        .integer('gametype_id')
        .references('id')
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
