const database = require('../../database/database');
const getMember = require('../utils/getMemberObject');
const getPlayers = require('../../database/queries/getAllPlayers');
// const {
//   pickups: { numberOfPlayers },
// } = require('../../config/config');
const formatter = require('../utils/formatter');
const capGenerator = require('../utils/randomCaptainGenerator');
const setTopic = require('../utils/topicSetter');

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
      console.log('message :', message);

      //when we reach enough players, generate captains,
      //delete table entries and send message it is ready
      if (players.length === numberOfPlayers) {
        message.channel.send(`
        **Pickup ready:** 
        ${capGenerator(players)},
        ${formatter(players)}
        `);

        //also send DM to every player that pickup is ready
        players.forEach(player => {
          const currentPlayer = message.guild.members.get(player.discord_id);
          console.log('currentPlayer :', currentPlayer);
          currentPlayer.send(`
          **Pickup ready:**
          =======================
          ${capGenerator(players)},
          ${formatter(players)}
          `);
        });

        await database('added_players').delete();
      } else {
        console.log(message);
        setTopic(message.client.channels);
        message.channel.send(formatter(players));
      }
    } catch (e) {
      console.error(e);
      return message.channel.send(username + ' is already added!');
    }
  },
};
