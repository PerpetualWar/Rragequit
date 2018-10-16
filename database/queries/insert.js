const database = require('../database');

module.exports = async (table, ...arguments) => {
  console.log('arguments :', arguments);

  arguments.forEach(argument => {});

  return await database(table)
    .insert({})
    .returning('id');
};
