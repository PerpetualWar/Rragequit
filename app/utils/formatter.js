// const embed = require('./embed');
// const getPlayers = require('../../database/queries/getAllPlayers');

module.exports = players => {
  let formattedPlayers = [];

  if (players && players.length > 0) {
    players.forEach(userObj => {
      formattedPlayers.push(userObj.discord_username);
    });
    return `[ ${formattedPlayers.join(' || ')} ]`;
  } else {
    return `[ ]`;
  }
};
