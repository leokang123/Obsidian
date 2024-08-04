const makeLogData = (input) => {
  const fs = require('fs');
  const seoulTime = new Date().toLocaleString('kr', {
    timeZone: 'Asia/Seoul',
  });
  console.log(seoulTime);
};

module.exports = makeLogData;

makeLogData();
