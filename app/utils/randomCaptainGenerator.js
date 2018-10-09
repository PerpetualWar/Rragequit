const sampleSize = require('lodash/sampleSize');

module.exports = players => {
  const res = sampleSize(players, 2);

  const { discord_username: cap1 } = res[0];
  const { discord_username: cap2 } = res[1];

  return `Captains are: **${cap1}** and **${cap2}**`;
};
