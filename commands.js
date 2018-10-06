require('dotenv').config('./.env');
const playersFormatter = require('./utils/formatter');
const database = require('./database/database');

module.exports = (command, message, adminAdd) => {
  const commands = {
    ping() {
      return message.reply('pong');
    },
    async add() {
      try {
        await database('added_players').insert({
          discord_id: message.author.id,
          discord_username: message.author.username,
        });
        return message.channel.send(message.author.username + ' added');
      } catch (e) {
        console.error(e);
        return message.channel.send(
          message.author.username + ' is already added!'
        );
      }
    },
    async remove() {
      await database('added_players').insert({ discord_id: message.author.id });
      return message.channel.send(message.author.username + ' added');
    },
    async who() {
      const players = await database
        .from('added_players')
        .select('discord_username');

      const formatted = playersFormatter(players);
      return message.channel.send(formatted);
    },
  };

  return commands[command]();
};
