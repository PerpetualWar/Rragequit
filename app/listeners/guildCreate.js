const setTopic = require('../utils/topicSetter');

module.exports = client =>
  client.on('guildCreate', guild => {
    console.log('guild', guild);
    // const botId = client.user.id;
    // const botGuilds = client.guilds.keys();
    // setTopic(client.channels);
    const newGuildId = guild.id;
  });
