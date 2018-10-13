const getMember = require('../utils/getMemberObject');
const { mutedRole, channel: configChannel } = require('../../config/config');
const timedUserAction = require('../utils/timedUserAction');

module.exports = {
  name: 'rolemute',
  description: 'mute players guild wide',
  aliases: ['rm'],
  admin: true,
  guildOnly: false,
  async execute(message, args) {
    if (args.length > 0) {
      const {
        id,
        user: { username },
      } = getMember(message, args);

      // const member = guild.member(user) || (await guild.fetchMember(user));

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
          `${username} is muted with a reason: ${args.slice(1).join(' ')}`
        );
      } catch (e) {
        console.error(e);
      }
    } else {
      return message.author.send(`username must be provided`);
    }
  },
};
