module.exports = (message, args) => {
  console.log(args);
  const memberName = args[0] || null;
  console.log(memberName);
  const memberObject = message.guild.members.find(
    item => item.user.username === memberName
  );

  return {
    memberObject,
    memberName,
  };
};
