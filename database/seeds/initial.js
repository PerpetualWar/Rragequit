exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    await knex('guilds').del(), // Inserts seed entries
    knex('guilds').insert({
      id: '501089528480661505',
      name: 'Rragequit',
      prefix: '!',
      admin_role: 'admin',
    }),
    knex('guilds').insert({
      id: '150610549829271552',
      name: '#capickup',
      prefix: '!',
      admin_role: 'admin',
    }),
    await knex('channels').del(), // Inserts seed entries
    knex('channels').insert({
      id: '501821405822713856',
      name: 'pickup',
      guild_id: '501089528480661505',
    }),
    knex('channels').insert({
      id: '150610797117046784',
      name: 'capickup',
      guild_id: '150610549829271552',
    }),
    await knex('players').del(), // Inserts seed entries
    knex('players').insert({
      id: '103562232985571328',
      username: 'PerpetualWar',
    }),
  ]);
};
