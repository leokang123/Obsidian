const getRandomBanner = (input) => {
  console.log(input);
  const fs = require("fs");
  const path = require("path");
  console.log(input);
  const parentDir = path.resolve(input, "../..");
  const backGroundPath = path.join(parentDir, "Resources", "Background");
  const resourceArr = fs.readdirSync(backGroundPath);
  const resourceLength = resourceArr.length;
  const randomNumber = Math.floor(Math.random() * resourceLength);
  return `\"![[${resourceArr[randomNumber]}]]\"`;
};

module.exports = getRandomBanner;
