const setTopic = require('../utils/topicSetter');
const removePlayer = require('../../database/queries/removePlayer');
const getPlayers = require('../../database/queries/getAllPlayers');
const printPlayers = require('../utils/printPlayers');

module.exports = client =>
  client.on('presenceUpdate', async (oldVal, newVal) => {
    console.log('oldVal :', oldVal);
    console.log('newVal :', newVal.guild.channels);

    //get all players and get id of players
    const userId = newVal.id;
    const addedPlayers = await getPlayers();

    //if user is offline, check if it was a player and remove it from db
    // and set topic and channel message again to notify
    //otherwise do nothing if he/she is not a player
    if (newVal.presence.status === 'offline') {
      addedPlayers.forEach(async player => {
        if (player.discord_id === userId) {
          console.log('from offline');

          try {
            await Promise.all([
              removePlayer(userId),
              setTopic(newVal.guild.channels),
              printPlayers(newVal.guild.channels),
            ]);
          } catch (e) {
            console.error(e);
          }
        }
      });
    }
  });
