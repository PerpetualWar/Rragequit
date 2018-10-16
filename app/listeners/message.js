const { prefix, channel } = require('../../config/config');
const cooldownLogic = require('./../utils/cooldowns');
const guildOnly = require('../utils/guildOnly');
const dmOnly = require('../utils/dmOnly');
const commandRunner = require('../utils/commandRunner');
const getChannels = require('../../database/queries/getChannels');

module.exports = (client, cooldowns) =>
  client.on('message', async message => {
    console.log(message);
    //**THIS NEEDS FIXIGN
    //FOR MULTIPEL CHANNELS PER GUILD**
    client.guilds.get();
    // const res = await getChannels(message.guild.id);
    // console.log('res :', res);

    //if no prefix or bot sending msg, ignore
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

    //sanity checks
    guildOnly(command, message);
    dmOnly(command, message);

    //spam prevention
    const inEffect = cooldownLogic(command, message);
    if (inEffect) return;

    //cfg allowed to be used in DM, without being in specific channel first
    //(so we can configure channel first and other stuff like gametype)
    if (command.name === 'config') return commandRunner(command, message, args);

    //listen only on designated channels or dms
    if (message.channel.type !== 'dm' && message.channel.name !== channel)
      return;
    console.log('here');

    //here we finally run commands
    commandRunner(command, message, args);
  });
