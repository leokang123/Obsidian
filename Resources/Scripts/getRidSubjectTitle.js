const getRidSubjectTitle = (input) => {
  const str = input.trim();
  const matchArr = str.match(/\((.*)\)/);
  if (matchArr === null) return 'Default';
  const title = str.substring(matchStr[0].length);
  return title;
};

module.exports = getRidSubjectTitle;
