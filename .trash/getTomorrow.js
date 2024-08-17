const getTomorrow = (date) => {
  const baseDate = new Date(date);
  const tomorrow = new Date(baseDate);
  tomorrow.setDate(baseDate.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
  const day = tomorrow.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

module.exports = getTomorrow;
