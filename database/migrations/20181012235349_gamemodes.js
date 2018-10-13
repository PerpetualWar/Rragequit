exports.up = function(knex, Promise) {
  return knex.schema.createTable('game_modes', table => {
    table.increments();
    table.string('gamemode_name');
    table.integer('number_of_players').unsigned();
    table
      .integer('channel_id')
      .unsigned()
      .references('channels.id')
      .notNull()
      .onDelete('cascade');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('game_modes');
};
