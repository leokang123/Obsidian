const fs = require('fs');
const path = require('path');
const obsidianPath = '/Users/jeonghun/Documents/Obsidian Vault';

const getRandomBanner = () => {
  const backGroundPath = path.join(obsidianPath, 'Resources', 'Background');
  const resourceArr = fs.readdirSync(backGroundPath);
  const resourceLength = resourceArr.length;
  const randomNumber = Math.floor(Math.random() * resourceLength);
  return `banner: \"![[${resourceArr[randomNumber]}]]\"\nbanner_y: 0.6`;
};

const getSeries = (input) => {
  const studiedPath = path.join(obsidianPath, 'Studied');
  const mdFiles = fs.readdirSync(studiedPath);

  const str = input.trim();
  const matchArr = str.match(/\((.*)\)/g);
  if (matchArr === null) return 1;
  const compactMatch = matchArr[0].replaceAll(' ', '');
  const filteredFile = mdFiles.filter((p) => {
    const compareCompact = p.replaceAll(' ', '');
    return compareCompact.includes(compactMatch);
  });
  return filteredFile.length;
};

const getSeriesAndRandomBanner = (input) => {
  const series = getSeries(input);
  const bannerData = getRandomBanner();
  const propertyData = `${series}\n${bannerData}`;
  return propertyData;
};

console.log(1 > '3');

module.exports = getSeriesAndRandomBanner;
