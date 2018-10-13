const database = require('../database');

module.exports = async guild => {
  return await database('guilds')
    .insert({
      guild_id: guild.id,
      guild_name: guild.name,
    })
    .returning('guild_id');
};
