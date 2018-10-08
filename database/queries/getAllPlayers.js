const database = require('../database');

module.exports = async () => {
  return await database.from('added_players').select('discord_username');
};
