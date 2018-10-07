module.exports = client =>
  client.on('ready', () => {
    console.log('Bot is online!');
    console.log(client.status);
  });
