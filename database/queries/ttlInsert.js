const database = require('../database');

module.exports = async (playerId, expiresIn, dbField) => {
  return await database('added_players')
    .where({
      discord_id: playerId,
    })
    .update({
      [dbField]: expiresIn,
    });
};
