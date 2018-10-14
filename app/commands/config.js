const config = require('../../config/config');
const setChannels = require('../../database/queries/setChannel');
const setPrefix = require('../../database/queries/setPrefix');
const setAdmin = require('../../database/queries/setAdmin');
const setGametype = require('../../database/queries/setGametype');

module.exports = {
  name: 'config',
  description: 'change config settings',
  aliases: ['cfg'],
  admin: true,
  guildOnly: false,
  dmOnly: true,
  async execute(message, args) {
    console.log('args:', args);
    console.log('message :', message);

    if (args.length > 2) {
      const [guildId, setCommand, ...values] = args;
      console.log(values);
      console.log(setCommand);

      switch (setCommand.toLowerCase()) {
        case 'setchannel':
          const [channelId] = values;
          console.log(channelId);
          const channel = message.client.channels.get(channelId);
          await setChannels(guildId, channel);
          break;
        case 'setgametype':
          await setGametype(guildId, values);
          break;
        case 'setprefix':
          await setPrefix(guildId, values);
          break;
        case 'setadmin':
          await setAdmin(guildId, values);
          break;
        default:
          break;
      }
    } else return message.author.send(`You must provide command and value`);

    // return message.author.send(`${key} changed to ${value}`);
  },
};
