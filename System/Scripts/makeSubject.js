const makeSubject = (input) => {
  const str = input.trim();
  const matchStr = str.match(/\((.*)\)/);

  return matchStr ? matchStr[1].replaceAll(' ', '') : 'Default';
};

module.exports = makeSubject;
