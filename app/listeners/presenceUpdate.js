const setTopic = require('../utils/topicSetter');

module.exports = client =>
  client.on('presenceUpdate', (oldVal, newVal) => {
    console.log('oldVal :', oldVal);
    console.log('newVal :', newVal);
  });
