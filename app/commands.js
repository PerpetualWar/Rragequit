require('dotenv').config('./.env');
const playersFormatter = require('./utils/formatter');
const database = require('../database/database');

module.exports = (command, message, member) => {
  const commands = {
    ping() {
      return message.reply('pong');
    },
    async add({ id, user: { username } = {} } = {}) {
      const userId = member ? id : message.author.id;
      const userName = member ? username : message.author.username;

      try {
        await database('added_players').insert({
          discord_id: userId,
          discord_username: userName,
        });
        // return message.channel.send(userName + ' added');
        return await this.who();
      } catch (e) {
        console.error(e);
        return message.channel.send(userName + ' is already added!');
      }
    },
    async remove({ id, user: { username } = {} } = {}) {
      const userId = member ? id : message.author.id;
      const userName = member ? username : message.author.username;

      try {
        await database('added_players')
          .where({ discord_id: userId })
          .delete();
        // return message.channel.send(userName + ' removed');
        return await this.who();
      } catch (e) {
        console.error(e);
        return message.channel.send(userName + ' is not removed!');
      }
    },
    async who() {
      try {
        const players = await database
          .from('added_players')
          .select('discord_username');

        if (players.length > 0) {
          const formatted = playersFormatter(players);
          return message.channel.send(formatted);
        } else throw new Error('empty query');
      } catch (e) {
        console.error(e);
        return message.channel.send('Nobody is added yet!');
      }
    },
  };

  if (member) return commands[command](member);
  return commands[command]();
};
