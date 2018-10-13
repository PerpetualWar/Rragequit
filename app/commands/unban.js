const getMember = require('../utils/getMemberObject');
const { mutedRole, channel: configChannel } = require('../../config/config');
const timedUserAction = require('../utils/timedUserAction');

module.exports = {
  name: 'unban',
  description: 'unban given player at channel',
  aliases: ['ub'],
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
        const bannedMember =
          message.channel.members.get(id) ||
          (await message.guild.fetchMember(id));

        message.channel.overwritePermissions(bannedMember, {
          VIEW_CHANNEL: null,
        });

        console.log('bannedMember :', bannedMember);

        bannedMember.user.send(`You have been unbanned`);

        return message.channel.send(`${username} is unbanned`);
      } catch (e) {
        console.error(e);
      }
    } else {
      return message.author.send(`username and TTL must be provided`);
    }
  },
};
