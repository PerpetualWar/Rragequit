module.exports = players => {
  let formattedPlayers = [];
  players.forEach(userObj => {
    formattedPlayers.push(userObj.discord_username);
  });
  return formattedPlayers.join(' || ');
};
