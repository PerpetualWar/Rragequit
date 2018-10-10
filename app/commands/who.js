const printPlayers = require('../utils/printPlayers');

module.exports = {
  name: 'who',
  description: 'players already added to the pickup',
  aliases: ['w'],
  guildOnly: true,
  cooldown: 5,
  async execute(message, args) {
    try {
      console.log(message);
      await printPlayers(message.guild.channels);
    } catch (e) {
      console.error(e);
      return message.channel.send('Nobody is added yet!');
    }
  },
};
