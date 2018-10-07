const commands = require('../app/commands');
const adminCommands = require('../app/adminCommands');
const messageParser = require('../utils/parser');
const config = require('../config/config');
const getAdminRoleId = require('../utils/admin').getAdminRoleId;
const isUserAdmin = require('../utils/admin').isUserAdmin;

exports.ready = client =>
  client.on('ready', () => {
    console.log('Bot is online!');
    console.log(client.status);
  });

exports.messages = client =>
  client.on('message', async message => {
    if (!message.content.startsWith(config.prefix)) return;

    //get admin role id or return undefined
    // const adminRoleId = getAdminRoleId(message);

    //get command and possibly a member object as well, if name was provided
    //and admin issued the command
    const { command, member } = messageParser(message, true);

    //check if message sender is an admin and member is truthy
    if (isUserAdmin() && config.adminCommands.includes(command))
      adminCommands(command, message);
    // else if (isUserAdmin() && config.commands.includes(command))
    else commands(command, message, member);
  });
