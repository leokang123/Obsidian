const makeLogData = (filePath) => {
  const fs = require('fs');
  const path = require('path');
  const obsidianPath = '/Users/jeonghun/Documents/Obsidian Vault';
  const logPath = path.join(obsidianPath, 'Resources/Log/log.md');
  const date = new Date();
  const relativeFilePath = path.relative(obsidianPath, filePath);
  const seoulTime = `${date.getFullYear()}-${date.getMonth().padStart(2, '0')}-${date.getDate().padStart(2, '0')} ${date.getHours().padStart(2, '0')}:${date.getMinutes().padStart(2, '0')}:${date.getSeconds().padStart(2, '0')}`;
  const logData = `[${seoulTime}] ${relativeFilePath} 생성\n`;
  fs.appendFileSync(logPath, logData);
  console.log(`${logPath}에 로그 기록 완료`);
};
const date = new Date();

const seoulTime = `${date.getFullYear()}-${date.getMonth().padStart(2, '0')}-${date.getDate().padStart(2, '0')} ${date.getHours().padStart(2, '0')}:${date.getMinutes().padStart(2, '0')}:${date.getSeconds().padStart(2, '0')}`;
console.log(seoulTime);
module.exports = makeLogData;
