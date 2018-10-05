module.exports = (command, message) => {
  const commands = {
    add() {
      return message.channel.send('added');
    },
    remove() {},
    who() {},
    ping() {
      return message.reply('pong');
    },
  };

  return commands[command]();
};
