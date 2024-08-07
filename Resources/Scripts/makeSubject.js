const makeSubject = (input) => {
  const str = input;
  const strArr = str.split(' ');
  const matchStr = strArr[0].match(/\((.*)\)/);
  return matchStr ? matchStr[1] : 'Default';
};

module.exports = makeSubject;
