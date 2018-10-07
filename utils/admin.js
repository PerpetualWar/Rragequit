exports.getAdminRoleId = message => {
  const { id: adminRoleId } = message.guild.roles.find(
    role => role.name === 'admin'
  );

  return adminRoleId;
};

exports.isUserAdmin = message => {
  return message.member.roles.has(adminRoleId);
};
