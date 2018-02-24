const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
 
client.on('ready', () => {
  console.log('Bot is online!');
});

client.on('message', message => {
  if(!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  if (command === 'ping') {
    message.reply('pong');
  }

  if(command === 'add') {
      message.channel.send("added");
  }
});
 
client.login(config.token);