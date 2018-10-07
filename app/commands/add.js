const database = require('../../database/database');
const getMember = require('../utils/getMemberObject');
const { execute: who } = require('./who');

module.exports = {
  name: 'add',
  description: 'add player to pickup',
  aliases: ['a'],
  adminArgs: true,
  guildOnly: true,
  cooldown: 5,
  async execute(message, args) {
    const {
      id,
      user: { username },
    } = getMember(message, args);

    try {
      await database('added_players').insert({
        discord_id: id,
        discord_username: username,
      });
      const currentPlayers = await who(message);
      console.log(currentPlayers);
    } catch (e) {
      console.error(e);
      return message.channel.send(username + ' is already added!');
    }
  },
};
