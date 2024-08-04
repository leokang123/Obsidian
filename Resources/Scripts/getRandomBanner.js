const getRandomBanner = () => {
  const fs = require("fs");
  const path = require("path");
  const parentDir = path.resolve(__dirname, "../..");
  const backGroundPath = path.join(parentDir, "Background");
  // const resourceArr = fs.readdirSync(backGroundPath);
  // const resourceLength = resourceArr.length;
  // const randomNumber = Math.floor(Math.random() * resourceLength);
  // return `![[${resourceArr[randomNumber]}]]`;
  return __dirname;
};
module.exports = getRandomBanner;
