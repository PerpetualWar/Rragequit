require('dotenv').config('./.env');
const Discord = require('discord.js');
const ready = require('./app/listeners').ready;
const messages = require('./app/listeners').messages;

//bot init
const client = new Discord.Client();

//bot login
client.login(process.env.BOT_TOKEN);

//listeners
ready(client);
messages(client);

//global error handler
process.on('unhandledRejection', error =>
  console.error(`Uncaught Promise Rejection:\n${error}`)
);
