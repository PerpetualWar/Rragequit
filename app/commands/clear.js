const database = require('../../database/database');
const playersFormatter = require('../utils/formatter');
// const getMemberObject = require('../../utils/getMemberObject');
// const { execute: who } = require('./who');

module.exports = {
  name: 'clear',
  description: 'remove all players from pickup',
  guildOnly: true,
  async execute(message, args) {
    try {
      await database('added_players').delete();

      return message.channel.send(playersFormatter());
    } catch (e) {
      console.error(e);
      return message.channel.send('Something went wrong');
    }
  },
};
