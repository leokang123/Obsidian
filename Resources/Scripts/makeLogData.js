const makeLogData = (input) => {
  const fs = require('fs');
  const path = require('path');
  const obsidianPath = '/Users/jeonghun/Documents/Obsidian Vault';
  const logPath = path.join(obsidianPath, 'Resources/Log/log.md');
  const seoulTime = new Date().toLocaleString('kr', {
    timeZone: 'Asia/Seoul',
  });
  const logData = `[${seoulTime}] ${input} 생성`;
  fs.appendFileSync(logPath, logData);
  console.log(`${logPath}에 로그 기록 완료`);
};

module.exports = makeLogData;

makeLogData();
