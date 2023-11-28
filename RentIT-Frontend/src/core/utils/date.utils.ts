import {formatDate} from "@angular/common";
import {isBefore, setDay} from "date-fns";

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

export function toUTCDate(date: Date) {
  return new Date(formatDate(date, DATE_FORMAT.YYYY_MM_DD_HH_MM_SS, DATE_LOCALE.EN_US,  DATE_TIMEZONE.UTC));
}

export function addDays(date: Date, days: number): Date {
  date.setDate(date.getDate() + days);
  return date;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
