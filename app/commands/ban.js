const getMember = require('../utils/getMemberObject');
const { mutedRole, channel: configChannel } = require('../../config/config');
const ttl = require('../utils/timedUserAction');
const ttlInsert = require('../../database/queries/ttlInsert');

module.exports = {
  name: 'ban',
  description: 'ban given player at channel',
  aliases: ['b'],
  admin: true,
  guildOnly: false,
  async execute(message, args) {
    if (args.length > 1) {
      const {
        id,
        user: { username },
      } = getMember(message, args);

      try {
        const banMember =
          message.channel.members.get(id) ||
          (await message.guild.fetchMember(id));

        const ttlValue = ttl(args[1]);

        await ttlInsert(id, ttlValue, 'banned_expires_in');

        await message.channel.overwritePermissions(banMember, {
          VIEW_CHANNEL: false,
        });

        banMember.user.send(
          `You have been banned for ${args[1]} with a reason: ${args
            .slice(2)
            .join(' ')}`
        );

        return message.channel.send(
          `${username} is banned with a reason: ${args.slice(2).join(' ')}`
        );
      } catch (e) {
        console.error(e);
      }
    } else {
      return message.author.send(`username and TTL must be provided`);
    }
  },
};
