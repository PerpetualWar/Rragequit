const database = require('../database');

module.exports = async guildId => {
  return await database
    .from('channels')
    .where({ guild_id: guildId })
    .select('id', 'name');
};
