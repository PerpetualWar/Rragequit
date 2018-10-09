// const Discord = require('discord.js');
// const output = new Discord.RichEmbed();

//testing embeds
module.exports = players => {
  players.forEach(player => {});

  return {
    color: 0x0099ff,
    description: 'Some description here',
    fields: [
      {
        name: 'Regular field title',
        value: true,
      },
      {
        name: 'Regular field title',
        value: true,
      },
    ],
  };
};
