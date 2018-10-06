const config = require('../config/config');

module.exports = ({ content, guild }) => {
  const command = content.split(' ')[0].slice(config.prefix.length);

  //we must return null cause undefined in comparation in find method,
  //returns first value from array
  const memberName = content.split(' ')[1] || null;
  const member = guild.members.find(item => item.user.username === memberName);

  return { command, member };
};
