const setTopic = require('../utils/topicSetter');

module.exports = client =>
  client.on('ready', () => {
    console.log('Bot is online!');
    setTopic(client.channels);
  });
