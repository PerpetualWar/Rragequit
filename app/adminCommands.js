const database = require('../database/database');

module.exports = (command, message) => {
  const adminCommands = {
    async clear() {
      try {
        await database('added_players').delete();
        return message.channel.send('All players removed');
      } catch (e) {
        console.error(e);
        return message.channel.send('Something went wrong');
      }
    },
  };

  return adminCommands[command]();
};
