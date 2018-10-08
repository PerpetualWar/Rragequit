const database = require('../../database/database');
const getMember = require('../utils/getMemberObject');
const { execute: who } = require('./who');
const getPlayers = require('../../database/queries/getAllPlayers');
const { pickupNumber } = require('../../config/config');
const formatter = require('../utils/formatter');
const capGenerator = require('../utils/randomCaptainGenerator');

module.exports = {
  name: 'add',
  description: 'add player to pickup',
  aliases: ['a'],
  adminArgs: true,
  guildOnly: true,
  cooldown: 5,
  async execute(message, args) {
    const {
      id,
      user: { username },
    } = getMember(message, args);

    try {
      await database('added_players').insert({
        discord_id: id,
        discord_username: username,
      });

      const players = await getPlayers();

      //when we reach enough players, generate captains,
      //delete table entries and send message it is ready
      if (players.length === pickupNumber) {
        message.channel.send(`
        **Pickup ready:** 
        ${capGenerator(players)},
        ${formatter(players)}
        `);

        await database('added_players').delete();
      } else return message.channel.send(formatter(players));
    } catch (e) {
      console.error(e);
      return message.channel.send(username + ' is already added!');
    }
  },
};
