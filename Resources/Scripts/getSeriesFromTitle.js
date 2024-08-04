const getSeriesFromTitle = (input) => {
  const str = input.trim();
  const strArr = str.split(' ');
  const lastElement = strArr[strArr.length - 1].match(/\d+/)[0];
  if (lastElement === null) return 1;
  return Number(lastElement);
};

module.exports = getSeriesFromTitle;
