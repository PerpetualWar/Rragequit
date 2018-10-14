const setGuild = require('../../database/queries/setGuild');
const setChannel = require('../../database/queries/setChannel');

module.exports = client =>
  client.on('guildCreate', async guild => {
    console.log('guild', guild);

    await setGuild(guild);

    // const mainChannel = guild.channels.get(guild.id);
    // await setChannel(guild.id, mainChannel); //guildId, channel
  });
