const getRandomBanner = () => {
  const fs = require('fs');
  const path = require('path');
  const obsidianPath = '/Users/jeonghun/Documents/Obsidian Vault';
  const backGroundPath = path.join(obsidianPath, 'Resources', 'Background');
  const resourceArr = fs.readdirSync(backGroundPath);
  const resourceLength = resourceArr.length;
  const randomNumber = Math.floor(Math.random() * resourceLength);
  return `banner: \"![[${resourceArr[randomNumber]}]]\"\nbanner_y: 0.6`;
};

const getSeriesAndRandomBanner = (input) => {
  const str = input.trim();
  const strArr = str.split(' ');
  let lastElement = strArr[strArr.length - 1].match(/\d+/);
  if (lastElement === null) lastElement = 1;
  const bannerData = getRandomBanner();
  const propertyData = `${lastElement[0]}\n${bannerData}`;
  console.log(propertyData);
  return propertyData;
};

module.exports = getSeriesAndRandomBanner;
