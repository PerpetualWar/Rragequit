const database = require('../../database/database');
const playersFormatter = require('../utils/formatter');
const setTopic = require('../utils/topicSetter');

module.exports = {
  name: 'clear',
  description: 'remove all players from pickup',
  admin: true,
  guildOnly: true,
  async execute(message, args) {
    try {
      await database('added_players').delete();

      setTopic(message.client.channels);
      return message.channel.send(playersFormatter());
    } catch (e) {
      console.error(e);
      return message.channel.send('Something went wrong');
    }
  },
};
