exports.up = function(knex, Promise) {
  return knex.schema.createTable('channels', table => {
    table.increments();
    table.string('channel_id').unique();
    table.string('channel_name');
    table
      .integer('guild_id')
      .unsigned()
      .references('guilds.id')
      .notNull()
      .onDelete('cascade');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('channels');
};
