const { channel: configChannel, pickupName } = require('../../config/config');
const getPlayers = require('../../database/queries/getAllPlayers');
const formatter = require('../utils/formatter');

module.exports = async channels => {
  const pickupChannel = channels.find(
    channel => channel.name === configChannel
  );

  console.log(pickupChannel);

  return await pickupChannel.setTopic(
    `**${pickupName}**: ${formatter(await getPlayers())}`
  );
};
