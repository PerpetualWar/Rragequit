const getPlayers = require('../../database/queries/getAllPlayers');
const formatter = require('./formatter');
const { channel: configChannel } = require('../../config/config');

module.exports = async channels => {
  const pickupChannel = channels.find(
    channel => channel.name === configChannel
  );
  const players = await getPlayers();
  const formatted = formatter(players);
  return pickupChannel.send(formatted);
};
