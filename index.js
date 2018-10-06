const Discord = require('discord.js');
const commands = require('./commands');
const config = require('./config.json');

const client = new Discord.Client();

//Bot definition
client.on('ready', () => {
  console.log('Bot is online!');
  console.log(client.status);
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  console.log(member);
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

//event listener for messsages
client.on('message', message => {
  console.log(message);
  console.log(message.member instanceof Set);
  if (!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(' ')[0].slice(config.prefix.length);
  console.log(command);

  commands(command, message, 'bleh');
});

//global error handler
process.on('unhandledRejection', error =>
  console.error(`Uncaught Promise Rejection:\n${error}`)
);

//bot login
client.login(config.token);
