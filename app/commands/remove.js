const database = require('../../database/database');
const getMember = require('../utils/getMemberObject');
const { execute: who } = require('./who');
const setTopic = require('../utils/topicSetter');

module.exports = {
  name: 'remove',
  description: 'remove players from pickup',
  aliases: ['r'],
  adminArgs: true,
  guildOnly: true,
  cooldown: 5,
  async execute(message, args) {
    const {
      id,
      user: { username },
    } = getMember(message, args);

    try {
      await database('added_players')
        .where({ discord_id: id })
        .delete();
      setTopic(message.client.channels);
      return await who(message);
    } catch (e) {
      console.error(e);
      return message.channel.send(username + ' is not removed!');
    }
  },
};
