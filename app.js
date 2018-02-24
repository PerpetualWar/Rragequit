const Discord = require('discord.js');
const logger = require('winston');
const client = new Discord.Client();

const config = require('./config.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.add(logger.transports.File, { filename: 'log.txt' });
logger.level = 'debug';

client.on('ready', () => {
  console.log('Bot is online!');
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

client.on('message', message => {
  if (!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  if (command === 'ping') {
    message.reply('pong');
  }

  if (command === 'add') {
    message.channel.send("added");
  }
});

client.login(config.token);