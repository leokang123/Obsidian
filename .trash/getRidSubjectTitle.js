const getRidSubjectTitle = (input) => {
  const str = input.trim();
  const matchArr = str.match(/\((.*)\)/g);
  if (matchArr === null) return 'Default';
  const title = str.substring(matchArr[0].length).trim();
  return title;
};

module.exports = getRidSubjectTitle;
