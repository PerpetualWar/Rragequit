const database = require('../database');

module.exports = async (guildId, channel) => {
  // channels.forEach(async channel => {
  // for (const channel of channels) {
  try {
    return await database('channels')
      .insert({
        id: channel.id,
        name: channel.name,
        guild_id: guildId,
      })
      .returning('id');
  } catch (e) {
    Promise.reject(e);
  }
  // }
  // });
};
