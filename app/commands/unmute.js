const getMember = require('../utils/getMemberObject');
const { mutedRole } = require('../../config/config');

module.exports = {
  name: 'unmute',
  description: 'mute given players at channel',
  aliases: ['u'],
  admin: true,
  guildOnly: false,
  async execute(message, args) {
    if (args.length > 0) {
      const {
        id,
        user: { username },
      } = getMember(message, args);
      const unmuteMember = message.channel.members.get(id);
      console.log('unmuteMember :', unmuteMember);
      const muteRole = message.guild.roles.find(
        role => role.name === mutedRole
      );
      console.log('muteRole :', muteRole);
      await unmuteMember.removeRole(muteRole);

      return message.channel.send(`${username} is unmuted!`);
    } else {
      return message.channel.send(`username must be provided`);
    }
  },
};
