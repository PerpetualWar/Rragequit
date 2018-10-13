const setTopic = require('../utils/topicSetter');
const setGuild = require('../../database/queries/setGuild');

module.exports = client =>
  client.on('guildCreate', guild => {
    console.log('guild', guild);

    await setGuild(guild)
  });
