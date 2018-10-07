const playersFormatter = require('../utils/formatter');
const database = require('../../database/database');

module.exports = {
  name: 'who',
  description: 'players already added to the pickup',
  guildOnly: true,
  cooldown: 5,
  async execute(message, args) {
    try {
      const players = await database
        .from('added_players')
        .select('discord_username');

      const formatted = playersFormatter(players);
      return message.channel.send(formatted);
    } catch (e) {
      console.error(e);
      return message.channel.send('Nobody is added yet!');
    }
  },
};
