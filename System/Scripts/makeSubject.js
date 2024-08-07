const makeSubject = (input) => {
  const str = input.trim();
  const matchStr = str.match(/^\((.*)\)/g);
  if (!matchStr) return 'Default';

  const matchArr = matchStr[0].split(' ');
  const filteredSubject = matchArr.map((p) => {
    const tmp = p.slice(1, p.length - 1);
    return tmp.replaceAll(' ', '');
  });
  if (filteredSubject.length > 1)
    return filteredSubject[filteredSubject.length - 1];
  return filteredSubject[0];
};

module.exports = makeSubject;
