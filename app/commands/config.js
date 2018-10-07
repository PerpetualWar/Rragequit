const config = require('../../config/config');

module.exports = {
  name: 'config',
  description: 'change config settings',
  aliases: ['cfg'],
  admin: true,
  guildOnly: false,
  async execute(message, args) {
    const [key, value] = args;
    config[key] = value;
    console.log(config);

    //needs observables or some sort of pub/sub pattern to work
    //maybe not even needed

    return message.author.send(`${key} changed to ${value}`);
  },
};
