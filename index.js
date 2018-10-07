require('dotenv').config('./.env');
const fs = require('fs');
const Discord = require('discord.js');
const ready = require('./app/listeners').ready;
const messages = require('./app/listeners').messages;
// const messageParser = require('./app/utils/parser');
// const config = require('./config/config');
// const getAdminRoleId = require('./app/utils/admin').getAdminRoleId;
// const isUserAdmin = require('./app/utils/admin').isUserAdmin;
// const commands = require('./app/commands');
// const adminCommands = require('./app/adminCommands');

//bot init
const client = new Discord.Client();

//new colletions
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

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
ready(client);
messages(client, cooldowns);

//global error handler
process.on('unhandledRejection', error => {
  console.error(`Uncaught Promise Rejection:\n${error}`);
});

//bot login
client.login(process.env.BOT_TOKEN);
