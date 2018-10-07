const { prefix, channel } = require('../../config/config');
const cooldownLogic = require('./../utils/cooldowns');
const guildOnly = require('../utils/guildOnly');
const commandRunner = require('../utils/commandRunner');

module.exports = (client, cooldowns) =>
  client.on('message', async message => {
    console.log(message);
    if (message.channel.name !== channel) return;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //we take out command name and possible arguments
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    //get command object from collection by command name or alias
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        cmd => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    //guildonly sanity check
    guildOnly(command, message);

    //spam prevention
    const inEffect = cooldownLogic(command, message);
    if (inEffect) return;

    //here we finally run commands
    commandRunner(command, message, args);
  });
