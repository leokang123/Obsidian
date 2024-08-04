// import 안된단다 여기선
const makeSubject = (input) => {
  const str = input;
  const strArr = str.split(' ');
  const matchStr = strArr[0].match(/\((.*)\)/);
  return matchStr ? matchStr[1] : 'Default';
};

const makeSubjectTag = (input) => {
  const subject = makeSubject(input);
  if (subject === 'Default') return;
  return `#${subject}`;
};

module.exports = makeSubjectTag;
