exports.getAdminRoleId = message => {
  const { id: adminRoleId } = message.guild.roles.find(
    role => role.name === 'admin'
  );

  return adminRoleId;
};

exports.isUserAdmin = message => {
  console.log(message);
  return message.member.roles.has(getAdminRoleId(message));
};
