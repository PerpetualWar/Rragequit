const getMember = require('../utils/getMemberObject');
const { mutedRole, channel: configChannel } = require('../../config/config');
const timedUserAction = require('../utils/timedUserAction');

module.exports = {
  name: 'mute',
  description: 'mute given players at channel',
  aliases: ['m'],
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

        message.channel.overwritePermissions(muteMember, {
          SEND_MESSAGES: false,
        });

        console.log('muteMember :', muteMember);

        return message.channel.send(
          `${username} is muted with a reason: ${args.slice(1).join(' ')}`
        );
      } catch (e) {
        console.error(e);
      }
    } else {
      return message.author.send(`username and TTL must be provided`);
    }
  },
};
