module.exports = (command, message) => {
  if (command.guildOnly && message.channel.type !== 'text')
    return message.reply("I can't execute that command inside DMs!");
};
