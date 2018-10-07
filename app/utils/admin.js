const { adminRole } = require('../../config/config');

exports.getAdminRoleId = message => {
  const { id: adminRoleId } = message.guild.roles.find(
    role => role.name === adminRole
  );
  return adminRoleId;
};

exports.isUserAdmin = message => {
  const res = message.member.roles.some(role => role.name === adminRole);
  console.log(res);
  return res;
};
