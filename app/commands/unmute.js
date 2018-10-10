const getMemberByArg = require('../utils/getMemberObject');

module.exports = {
  name: 'unmute',
  description: 'mute given players at channel',
  aliases: ['u'],
  admin: true,
  guildOnly: false,
  async execute(message, args) {
    if (args.length > 0) {
      const { id = {}, user: { username } = {} } = getMemberByArg(
        message,
        args
      );
      const unmuteMember = message.channel.members.get(id);
      unmuteMember.setMute(false);

      return message.channel.send(`${username} is unmuted!`);
    } else {
      return message.channel.send(`username must be provided`);
    }
  },
};
