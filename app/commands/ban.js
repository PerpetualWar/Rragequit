const getMember = require('../utils/getMemberObject');
const { mutedRole, channel: configChannel } = require('../../config/config');
const timedUserAction = require('../utils/timedUserAction');

module.exports = {
  name: 'ban',
  description: 'ban given player at channel',
  aliases: ['b'],
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
        const banMember =
          message.channel.members.get(id) ||
          (await message.guild.fetchMember(id));

        console.log('banMember :', banMember);

        await message.channel.overwritePermissions(banMember, {
          VIEW_CHANNEL: false,
        });

        banMember.user.send(
          `You have been banned with a reason: ${args.slice(1).join(' ')}`
        );

        return message.channel.send(
          `${username} is banned with a reason: ${args.slice(1).join(' ')}`
        );
      } catch (e) {
        console.error(e);
      }
    } else {
      return message.author.send(`username and TTL must be provided`);
    }
  },
};
