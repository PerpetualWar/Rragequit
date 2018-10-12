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

      try {
        const muteMember = message.channel.members.get(id);
        const muteRole = message.guild.roles.find(
          role => role.name === 'Muted'
        );

        muteMember.roles.set(muteRole);
        console.log('muteMember :', muteMember);
        console.log('muteRole', muteRole);

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
