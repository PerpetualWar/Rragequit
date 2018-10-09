module.exports = (message, args) => {
  //we expose member object either by args username or by author username
  const memberName = args[0] || null;

  let member;

  if (memberName) {
    member = message.guild.members.find(
      item => item.user.username === memberName
    );

    if (!member)
      return message.channel.send(`No user with that name on server`);
  } else {
    member = message.guild.members.get(message.author.id);
  }

  return member;
};
