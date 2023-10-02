export function isDateBeforeNow(date: Date) {
  let nowUTCDate = toUTCDate(new Date());
  return date < nowUTCDate;
}

export function toUTCDate(date: Date) {
  let UTCDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds(),
  );
  return UTCDate;
}
