exports.up = async function(knex, Promise) {
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
      table.increments('gametype_id');
      table.string('gametype_name');
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
    // await knex.schema.createTable('matches', table => {
    //   table.increments();
    //   table
    //     .foreign('type_id')
    //     .references('id')
    //     .inTable('ft_ticket_types');
    //   table.timestamps();
    // }),
  ]);
};

exports.down = async function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('players'),
    knex.schema.dropTable('gametypes'),
    knex.schema.dropTable('channels'),
    knex.schema.dropTable('guilds'),
  ]);
};
