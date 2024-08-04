const getRandomBanner = (input) => {
  const fs = require('fs');
  const path = require('path');
  const obsidianPath = '/Users/jeonghun/Documents/Obsidian Vault';
  const backGroundPath = path.join(obsidianPath, 'Resources', 'Background');
  const resourceArr = fs.readdirSync(backGroundPath);
  const resourceLength = resourceArr.length;
  const randomNumber = Math.floor(Math.random() * resourceLength);
  return `banner: \"![[${resourceArr[randomNumber]}]]\"\n\rbanner_y: 0.6`;
};

module.exports = getRandomBanner;
