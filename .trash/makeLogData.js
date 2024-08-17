const makeLogData = (filePath) => {
  const fs = require('fs');
  const path = require('path');
  const obsidianPath = '/Users/jeonghun/Documents/Obsidian Vault';
  const logPath = path.join(obsidianPath, 'System/Log/log.md');
  const date = new Date();
  const relativeFilePath = path.relative(obsidianPath, filePath);
  const months = String(date.getMonth() + 1).padStart(2, '0');
  const dates = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const seoulTime = `${date.getFullYear()}-${months}-${dates} ${hours}:${minutes}:${seconds}`;
  const logData = `[${seoulTime}] ${relativeFilePath} 생성\n`;
  fs.appendFileSync(logPath, logData);
  console.log(`${logPath}에 로그 기록 완료`);
};

module.exports = makeLogData;
