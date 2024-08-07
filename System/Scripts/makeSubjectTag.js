// import 안된단다 여기선
const makeSubject = (input) => {
  const str = input.trim();
  const matchStr = str.match(/^\((.*)\)/g);
  if (!matchStr) return 'Default';

  const matchArr = matchStr[0].split(' ');
  const filteredSubject = matchArr.map((p) => {
    const tmp = p.slice(1, p.length - 1);
    return tmp.replaceAll(' ', '');
  });
  return filteredSubject;
};

const makeSubjectTag = (input) => {
  const subject = makeSubject(input);
  const makeTag = subject.map((p) => `#${p}`).join(' ');
  return makeTag;
};

module.exports = makeSubjectTag;

console.log(makeSubjectTag('(대학교)  1교시'));
