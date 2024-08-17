const getSemester = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (year === 2024) {
    if (month < 8) return '3-1';
    return '3-2';
  } else if (year === 2025) {
    if (month < 8) return '4-1';
    return '4-2';
  }
  return '5-1';
};

module.exports = getSemester;
