const { channel: configChannel, pickups } = require('../../config/config');
const getPlayers = require('../../database/queries/getAllPlayers');
const formatter = require('../utils/formatter');

module.exports = async channels => {
  const pickupChannel = channels.find(
    channel => channel.name === configChannel
  );

  const players = await getPlayers();

  let pickupNameString = '';
  await pickups.forEach(pickup => {
    pickupNameString += `**${pickup.pickupName}**: ${formatter(players)}  || `;
  });

  console.log(pickupNameString);

  return await pickupChannel.setTopic(pickupNameString);
};
