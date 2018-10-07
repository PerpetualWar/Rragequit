const { prefix } = require('../config/config');
const cooldownLogic = require('./utils/cooldowns');
// const commands = require('../app/commands');
// const adminCommands = require('../app/adminCommands');
// const messageParser = require('./utils/parser');
// const getAdminRoleId = require('./utils/admin').getAdminRoleId;
// const isUserAdmin = require('./utils/admin').isUserAdmin;

exports.ready = client =>
  client.on('ready', () => {
    console.log('Bot is online!');
    console.log(client.status);
  });

exports.messages = (client, cooldowns) =>
  client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    //guildonly sanity check
    if (command.guildOnly && message.channel.type !== 'text') {
      return message.reply("I can't execute that command inside DMs!");
    }

    //spam prevention
    cooldownLogic(cooldowns, command, message);

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }

    //get admin role id or return undefined
    // const adminRoleId = getAdminRoleId(message);

    //get command and possibly a member object as well, if name was provided
    //and admin issued the command
    // const { command, member } = messageParser(message, true);

    //check if message sender is an admin and member is truthy
    // if (isUserAdmin(message) && config.adminCommands.includes(command))
    //   // adminCommands(command, message);
    //   console.log('works');
    // // else if (isUserAdmin() && config.commands.includes(command))
    // else commands(command, message, member);
  });
