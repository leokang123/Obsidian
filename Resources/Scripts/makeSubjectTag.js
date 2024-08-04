import { makeSubject } from './makeSubject';

const makeSubjectTag = (input) => {
  const subject = makeSubject(input);
  if (subject === 'Default') return;
  return `#${subject}`;
};

module.exports = {
  makeSubjectTag,
};
