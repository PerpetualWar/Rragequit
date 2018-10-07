require('dotenv').config('./.env');
const fs = require('fs');
const Discord = require('discord.js');
const ready = require('./app/listeners/ready');
const messages = require('./app/listeners/message');

//bot init
//-------------------------------------------------------------------
const client = new Discord.Client();

//commands collection setup
//-------------------------------------------------------------------
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./app/commands')
  .filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
  const command = require(`./app/commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
});

//event listeners
//-------------------------------------------------------------------
ready(client);
messages(client);

//global error handler
//-------------------------------------------------------------------
process.on('unhandledRejection', error => {
  console.error(`Uncaught Promise Rejection:\n${error}`);
});

//bot login
//-------------------------------------------------------------------
client.login(process.env.BOT_TOKEN);
