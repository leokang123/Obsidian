const makeLogData = (input) => {
  const fs = require('fs');
  const date = new Date();
  const fullDate = `${date.getFullYear()}-${date.getMonth()}`;
  console.log(date);
};

module.exports = makeLogData;

makeLogData();
