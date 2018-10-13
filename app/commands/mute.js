const getMember = require('../utils/getMemberObject');
const { mutedRole } = require('../../config/config');
const timedUserAction = require('../utils/timedUserAction');

module.exports = {
  name: 'mute',
  description: 'mute given players at channel',
  aliases: ['m'],
  admin: true,
  guildOnly: false,
  async execute(message, args) {
    if (args.length > 1) {
      const {
        id,
        user: { username },
      } = getMember(message, args);

      try {
        const muteMember = message.channel.members.get(id);
        const muteRole = message.guild.roles.find(
          role => role.name === mutedRole
        );

        console.log('muteRole', muteRole);
        console.log('muteMember :', muteMember);
        await muteMember.addRole(muteRole);
        console.log('muteMember :', muteMember);

        return message.channel.send(
          `${username} is muted with reason: ${args.slice(1).join(' ')}`
        );
      } catch (e) {
        console.error(e);
      }
    } else {
      return message.channel.send(`username must be provided`);
    }
  },
};
