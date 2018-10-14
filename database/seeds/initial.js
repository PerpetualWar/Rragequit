exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    await knex('guilds').del(),
    // Inserts seed entries
    await knex('guilds').insert({
      id: '150610549829271552',
      name: '#capickup',
    }),

    await knex('channels').del(),
    // Inserts seed entries
    await knex('channels').insert({
      id: '150610797117046784',
      name: '#capickup',
      guild_id: '150610549829271552',
    }),

    await knex('players').del(),
    // Inserts seed entries
    await knex('players').insert({
      id: '103562232985571328',
      username: 'PerpetualWar',
    }),
  ]);
};
