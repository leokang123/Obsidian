const getSeriesFromTitle = (input) => {
  const str = input.trim();
  const strArr = str.split(' ');
  if (matchStr === null) return;
  const title = strArr.slice(1).join(' ');
  return title;
};

module.exports = getSeriesFromTitle;
