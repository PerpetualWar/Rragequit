const database = require('../database');

module.exports = async matchId => {
  return await database
    .select('user_id')
    .from('matches')
    .where({
      match_id: matchId,
    });
};
