const database = require('../database');

module.exports = async (guildId, [adminRole]) => {
  try {
    return await database('guilds')
      .where({ id: guildId })
      .update({ admin_role: adminRole })
      .returning('id');
  } catch (e) {
    Promise.reject(e);
  }
};
