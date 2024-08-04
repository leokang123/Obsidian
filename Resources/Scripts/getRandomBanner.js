// 현재 디렉토리의 부모 디렉토리 경로 얻기

const getRandomBanner = () => {
  const fs = require("fs");
  const path = require("path");
  const parentDir = path.resolve(__dirname, "..");
  const backGroundPath = path.join(parentDir, "Background");
  const resourceArr = fs.readdirSync(backGroundPath);
  const resourceLength = resourceArr.length;
  const randomNumber = Math.floor(Math.random() * resourceLength);
  return resourceArr[randomNumber];
};
console.log(getRandomBanner());
module.exports = getRandomBanner;
