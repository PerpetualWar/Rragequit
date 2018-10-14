const database = require('../database');

module.exports = async guild => {
  return await database('guilds')
    .insert({
      id: guild.id,
      name: guild.name,
      prefix: '!',
      admin_role: 'admin',
    })
    .returning('id');
};
