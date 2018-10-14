const { isUserAdmin } = require('./../utils/admin');

module.exports = (command, message, args) => {
  try {
    //we are testing different use cases based on admin commands, or
    //on admin arguments only
    switch (command.admin || command.adminArgs) {
      case true && command.admin && isUserAdmin(message, args):
        command.execute(message, args);
        break;
      case true && command.admin && !isUserAdmin(message, args):
        message.reply('You are not authorized to run that command');
        break;
      case true &&
        command.adminArgs &&
        args.length > 0 &&
        !isUserAdmin(message, args):
        message.reply(
          'You are not authorized to provide arguments to this command'
        );
        break;
      case true &&
        command.adminArgs &&
        args.length === 0 &&
        !isUserAdmin(message, args):
        command.execute(message, []);
        break;
      default:
        command.execute(message, args);
        break;
    }
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
};
