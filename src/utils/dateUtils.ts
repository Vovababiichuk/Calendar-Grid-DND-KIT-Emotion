import { endOfMonth, endOfWeek, format, parseISO, startOfMonth, startOfWeek } from 'date-fns';
import { addMonths, subMonths } from 'date-fns';
import { Holiday, Task } from '../types/types';
import { DATE_FORMAT } from './constants';

const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const formatDate = (date: Date): string => {
  if (!isValidDate(date)) {
    console.warn('Invalid date passed to formatDate:', date);
    return '';
  }
  return format(date, DATE_FORMAT);
};

export const getTasksForDate = (date: Date, tasks: Task[]) => {
  if (!isValidDate(date)) {
    console.warn('Invalid date passed to getTasksForDate:', date);
    return [];
  }

  const dateStr = formatDate(date);
  return tasks.filter(task => isValidDate(task.date) && formatDate(task.date) === dateStr);
};

export const getHolidaysForDate = (date: Date, holidays: Holiday[]) => {
  if (!isValidDate(date)) {
    console.warn('Invalid date passed to getHolidaysForDate:', date);
    return [];
  }

  const dateStr = formatDate(date);
  return holidays.filter(holiday => {
    const holidayDate = parseISO(holiday.date);
    return isValidDate(holidayDate) && formatDate(holidayDate) === dateStr;
  });
};

export const getMonthStartAndEnd = (date: Date) => {
  if (!isValidDate(date)) {
    console.warn('Invalid date passed to getMonthStartAndEnd:', date);
    return { start: null, end: null };
  }
  return { start: startOfMonth(date), end: endOfMonth(date) };
};

export const getWeekStartAndEnd = (date: Date) => {
  if (!isValidDate(date)) {
    console.warn('Invalid date passed to getWeekStartAndEnd:', date);
    return { start: null, end: null };
  }
  return { start: startOfWeek(date), end: endOfWeek(date) };
};

export const changeMonth = (date: Date, direction: 'prev' | 'next') => {
  if (!isValidDate(date)) {
    console.warn('Invalid date passed to changeMonth:', date);
    return date;
  }

  return direction === 'prev' ? subMonths(date, 1) : addMonths(date, 1);
};
