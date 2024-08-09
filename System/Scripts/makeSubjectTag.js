// import 안된단다 여기선
const makeSubject = (input) => {
  const str = input.trim();
  const matchStr = str.match(/\(([^)]+)\)/g);
  if (!matchStr) return ['Default'];
  const filteredSubject = matchStr.map((p) => {
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
