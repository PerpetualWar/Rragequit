const database = require('../database');

module.exports = async playerId => {
  return await database('added_players')
    .delete()
    .where({
      discord_id: playerId,
    });
};
