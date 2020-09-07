let d1 = Date.now();
let d2 = new Date(2020, 7, 1).getTime();
let daysDiff = Math.floor((d1 - d2) / (1000 * 60 * 60 * 24));
let yearsDiff = new Date().getFullYear() - 2020;
let months =
  yearsDiff * 12 +
  (new Date().getMonth() - new Date("August 1,2020 00:20:18").getMonth());

export const countperday = (totalrecords) => {
  return Math.ceil(totalrecords / daysDiff) > 1
    ? Math.ceil(totalrecords / daysDiff)
    : 1;
};

export const countpermonth = (totalrecords) => {
  return Math.ceil(totalrecords / months) > 30
    ? Math.ceil(totalrecords / months)
    : 30;
};
