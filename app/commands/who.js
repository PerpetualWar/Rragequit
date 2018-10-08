const formatter = require('../utils/formatter');
const database = require('../../database/database');
const getPlayers = require('../../database/queries/getAllPlayers');

module.exports = {
  name: 'who',
  description: 'players already added to the pickup',
  aliases: ['w'],
  guildOnly: true,
  cooldown: 5,
  async execute(message, args) {
    try {
      const players = await getPlayers();
      const formatted = formatter(players);
      return message.channel.send(formatted);
    } catch (e) {
      console.error(e);
      return message.channel.send('Nobody is added yet!');
    }
  },
};
