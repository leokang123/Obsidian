const getRandomBanner = () => {
  const fs = require("fs");
  const path = require("path");
  const parentDir = path.resolve(__dirname, "../..");
  const backGroundPath = path.join(parentDir, "Background");
  const resourceArr = fs.readdirSync(__dirname);
  // const resourceLength = resourceArr.length;
  // const randomNumber = Math.floor(Math.random() * resourceLength);
  // return `![[${resourceArr[randomNumber]}]]`;
  return resourceArr;
};
module.exports = getRandomBanner;
