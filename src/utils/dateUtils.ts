import { format, parseISO } from 'date-fns';
import { Holiday } from '../types';

export const formatDate = (date: Date): string => {
  try {
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    console.warn('Invalid date:', date);
    return '';
  }
};

export const getHolidaysForDate = (date: Date, holidays: Holiday[]): Holiday[] => {
  const dateStr = formatDate(date);
  if (!dateStr) return [];

  return holidays.filter(holiday => {
    try {
      return formatDate(parseISO(holiday.date)) === dateStr;
    } catch (error) {
      console.warn('Invalid holiday date:', holiday.date);
      return false;
    }
  });
};

export const getTasksForDate = (date: Date, tasks: any[]) => {
  const dateStr = formatDate(date);
  if (!dateStr) return [];

  return tasks.filter(task => {
    try {
      return formatDate(task.date) === dateStr;
    } catch (error) {
      console.warn('Invalid task date:', task.date);
      return false;
    }
  });
};
