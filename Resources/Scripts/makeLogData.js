const makeLogData = (filePath) => {
  const fs = require('fs');
  const path = require('path');
  const obsidianPath = '/Users/jeonghun/Documents/Obsidian Vault';
  const logPath = path.join(obsidianPath, 'Resources/Log/log.md');
  const seoulTime = new Date().toLocaleString('kr', {
    timeZone: 'Asia/Seoul',
    hour12: false,
  });
  const relativeFilePath = path.relative(obsidianPath, filePath);
  const logData = `[${seoulTime}] ${relativeFilePath} 생성\n`;
  fs.appendFileSync(logPath, logData);
  console.log(`${logPath}에 로그 기록 완료`);
};

module.exports = makeLogData;
