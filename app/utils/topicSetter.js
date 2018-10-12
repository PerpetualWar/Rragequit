const {
  channel: configChannel,
  pickupName,
  numberOfPlayers,
} = require('../../config/config');
const getPlayers = require('../../database/queries/getAllPlayers');
const formatter = require('../utils/formatter');

module.exports = async channels => {
  const pickupChannel = channels.find(
    channel => channel.name === configChannel
  );

  const players = await getPlayers();
  const currentPlayers = players.length;
  console.log(currentPlayers);


  return pickupChannel.setTopic(
    `**${pickupName}**: [${currentPlayers}/${numberOfPlayers}]`

  );
};
