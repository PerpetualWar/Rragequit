const setTopic = require('../utils/topicSetter');
const config = require('../../config/config');
const database = require('../../database/database');

module.exports = client =>
  client.on('ready', () => {
    console.log('Bot is online!', client);
    // const botId = client.user.id;
    // const botGuildIds = client.guilds.keys();

    // await database('config').insert({
    //   guild_id: id,
    //   guild_name: name,
    // });

    setTopic(client.channels);
  });
