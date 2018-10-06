const { added, setAdded, mapAdded } = require('./state');

module.exports = (command, message, adminAdd) => {
  const commands = {
    add() {
      added.push(message.author.username);
      if (adminAdd) setAdded.add(adminAdd);
      setAdded.add(message.author.username);
      console.log(setAdded);
      return message.channel.send(message.author.username + ' added');
    },
    remove() {},
    who() {
      return message.channel.send(setAdded);
    },
    ping() {
      return message.reply('pong');
    },
  };

  return commands[command]();
};
