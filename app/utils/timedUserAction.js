module.exports = timeString => {
  // const test = timeString => {
  console.log(timeString);

  const regex = /(\d+)/g;
  const timeValues = timeString.split(regex).filter(Boolean);

  const msValues = {
    secs: 1000,
    seconds: 1000,
    mins: 60 * 1000,
    minutes: 60 * 1000,
    h: 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    hours: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    weeks: 7 * 24 * 60 * 60 * 1000,
    m: 30.5 * 24 * 60 * 60 * 1000,
    month: 30.5 * 24 * 60 * 60 * 1000,
    months: 30.5 * 24 * 60 * 60 * 1000,
    y: 365 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000,
    years: 365 * 24 * 60 * 60 * 1000,
  };

  const numberValues = { ...timeValues.filter(item => !isNaN(Number(item))) };
  const stringValues = { ...timeValues.filter(item => isNaN(Number(item))) };

  let expiresIn = 0;
  Object.values(stringValues).forEach((value, index) => {
    if (Object.keys(msValues).includes(value)) {
      expiresIn += msValues[value] * numberValues[index];
    }
  });

  console.log(expiresIn);

  if (expiresIn !== 0) return expiresIn;
  return 'Enter correct time frame';
};
// test('10df');
