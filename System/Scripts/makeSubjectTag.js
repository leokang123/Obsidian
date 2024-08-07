// import 안된단다 여기선
const makeSubject = (input) => {
  const str = input.trim();
  const matchStr = str.match(/\((.*)\)/);

  return matchStr ? matchStr[1].replaceAll(' ', '') : 'Default';
};

const makeSubjectTag = (input) => {
  const subject = makeSubject(input);
  return `#${subject}`;
};

module.exports = makeSubjectTag;
