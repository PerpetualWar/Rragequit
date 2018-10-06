require('dotenv').config('./.env');
const Discord = require('discord.js');
const commands = require('./commands');
const parser = require('./utils/parser');
const config = require('./config/config');

const client = new Discord.Client();

//Bot definition
client.on('ready', () => {
  console.log('Bot is online!');
  console.log(client.status);
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

//event listener for messages
client.on('message', async message => {
  console.log(message);

  if (!message.content.startsWith(config.prefix)) return;

  //fetch admin role id
  const { id: adminRoleId } = message.guild.roles.find(
    role => role.name === 'admin'
  );

  const { command, member } = parser(message);

  //check if message sender is an admin and member is truthy
  if (message.member.roles.has(adminRoleId) && member)
    commands(command, message, member);
  else commands(command, message);
});

//global error handler
process.on('unhandledRejection', error =>
  console.error(`Uncaught Promise Rejection:\n${error}`)
);

//bot login
client.login(process.env.BOT_TOKEN);
