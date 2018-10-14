const { adminRole } = require('../../config/config');

exports.getAdminRoleId = message => {
  const { id: adminRoleId } = message.guild.roles.find(
    role => role.name === adminRole
  );
  return adminRoleId;
};

exports.isUserAdmin = (message, args) => {
  console.log(args);

  //normal usecase, when sending message from channel
  if (message.member) {
    const res = message.member.roles.some(role => role.name === adminRole);
    console.log(res);
    return res;

    //certain usecase, when sending message to bot's DM
    //usually for specific admin commands
  } else if (args.length > 0) {
    const guildId = args[0];
    const userId = message.author.id;
    const guild = message.client.guilds.get(guildId);
    const member = guild.members.get(userId);
    const res = member.roles.some(role => role.name === adminRole);
    return res;
  }

  return false;
};
