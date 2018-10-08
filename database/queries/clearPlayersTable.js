const database = require('../database');

module.exports = async () => {
  return await database('added_players').delete();
};
