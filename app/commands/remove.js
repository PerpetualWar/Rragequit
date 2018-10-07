const database = require('../../database/database');
const getMemberObject = require('../utils/getMemberObject');
const { execute: who } = require('./who');

module.exports = {
  name: 'remove',
  description: 'remove players from pickup',
  aliases: ['r'],
  guildOnly: true,
  cooldown: 5,
  async execute(message, args) {
    const { memberObject, memberName } = getMemberObject(message, args);

    if (memberObject) {
      var id = memberObject.id;
      var username = memberObject.user.username;
    }
    const userId = memberName ? id : message.author.id;
    const userName = memberName ? username : message.author.username;

    try {
      await database('added_players')
        .where({ discord_id: userId })
        .delete();
      // return message.channel.send(userName + ' removed');
      return await who(message);
    } catch (e) {
      console.error(e);
      return message.channel.send(userName + ' is not removed!');
    }
  },
};
