const database = require('../../database/database');
const getMember = require('../utils/getMemberObject');
const insert = require('../../database/queries/insert');

module.exports = {
  name: 'register',
  description: 'register player to with bot',
  aliases: ['reg'],
  adminArgs: false,
  admin: false,
  guildOnly: true,
  cooldown: 5,
  async execute(message, args) {
    const {
      id,
      user: { username },
    } = getMember(message, args);

    console.log(id, username);

    try {
      await database('players')
        .insert({
          id,
          username,
        })
        .returning('id');

      message.channel.send(`${username} is now registered!`);
    } catch (e) {
      console.error(e);
      return message.channel.send(username + ' is already registered!');
    }
  },
};
