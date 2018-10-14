const database = require('../database');

module.exports = async (guildId, [prefix]) => {
  try {
    return await database('guilds')
      .where({ id: guildId })
      .update({ prefix })
      .returning('id');
  } catch (e) {
    Promise.reject(e);
  }
};
