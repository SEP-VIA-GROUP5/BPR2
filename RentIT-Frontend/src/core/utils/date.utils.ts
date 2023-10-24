import {formatDate} from "@angular/common";
import {isBefore} from "date-fns";

export enum DATE_FORMAT {
  YYYY_MM_DD_HH_MM_SS = 'yyyy-MM-dd HH:mm:ss'
}

export enum DATE_LOCALE {
  EN_US = 'en-US'
}

export enum DATE_TIMEZONE {
  UTC = 'UTC'
}

export function isDateBeforeNow(date: Date) {
  let nowUTCDate = toUTCDate(new Date());
  return isBefore(nowUTCDate, date);
}

export function getMinutesBetweenDates(date: Date, dateToCompare: Date) {
  let dateUTC = toUTCDate(date);
  let dateToCompareUTC = toUTCDate(dateToCompare);

  return (dateToCompare.getTime() - date.getTime()) / 60000;
}

function toUTCDate(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}
