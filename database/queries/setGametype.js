const database = require('../database');

module.exports = async (guildId, [name, numberOfPlayers, channelId]) => {
  console.log(name, numberOfPlayers, channelId);
  try {
    return await database('gametypes')
      .insert({
        name,
        number_of_players: numberOfPlayers,
        channel_id: channelId,
      })
      .returning('id');
  } catch (e) {
    Promise.reject(e);
  }
};
