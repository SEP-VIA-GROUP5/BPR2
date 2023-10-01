export function isDateBeforeNow(date: Date) {
  let nowDate = new Date();
  let nowUTCDate = new Date(
    nowDate.getUTCFullYear(),
    nowDate.getUTCMonth(),
    nowDate.getUTCDate(),
    nowDate.getUTCHours(),
    nowDate.getUTCMinutes(),
    nowDate.getUTCSeconds(),
    nowDate.getUTCMilliseconds(),
  );
  return date < nowUTCDate;
}
