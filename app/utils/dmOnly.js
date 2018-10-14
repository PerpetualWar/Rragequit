module.exports = (command, message) => {
  if (command.dmOnly && message.channel.type !== 'dm')
    return message.reply("I can't execute that command outside of DMs!");
};
