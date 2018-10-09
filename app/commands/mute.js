const getMemberByArg = require('../utils/getMemberObject');

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
      } = getMemberByArg(message, args);

      const muteMember = message.channel.members.get(id);
      muteMember.setMute(true, args[1]);

      console.log(muteMember);

      return message.channel.send(
        `${username} is muted with reason: ${args.slice(1).join(' ')}`
      );
    } else {
      return message.channel.send(`username must be provided`);
    }
  },
};
