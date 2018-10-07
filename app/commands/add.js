const database = require('../../database/database');
const getMemberObject = require('../utils/getMemberObject');
const { execute: who } = require('./who');

module.exports = {
  name: 'add',
  description: 'add player to pickup',
  aliases: ['a'],
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
      await database('added_players').insert({
        discord_id: userId,
        discord_username: userName,
      });
      // return message.channel.send(userName + ' added');
      return await who(message);
    } catch (e) {
      console.error(e);
      return message.channel.send(userName + ' is already added!');
    }
  },
};
