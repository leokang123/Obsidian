const getRidSubjectTitle = (input) => {
  const str = input;
  const strArr = str.split(' ');
  const matchStr = strArr[0].match(/\((.*)\)/);
  if (matchStr === null) return 'Default';
  const title = strArr.slice(1).join(' ');
  return title;
};

module.exports = getRidSubjectTitle;
