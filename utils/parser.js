const config = require('../config/config');

module.exports = ({ content, guild }, isAdmin) => {
  const command = content.split(' ')[0].slice(config.prefix.length);

  //we must return null cause undefined in comparation in find method,
  //returns first value from array

  if (isAdmin) {
    const memberName = content.split(' ')[1] || null;
    var member = guild.members.find(item => item.user.username === memberName);
  }

  return { command, member };
};
