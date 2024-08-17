const getYesterday = (date) => {
  const baseDate = new Date(date);
  const yesterday = new Date(baseDate);
  yesterday.setDate(baseDate.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
  const day = yesterday.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

module.exports = getYesterday;
