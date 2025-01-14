// import { format, parseISO } from 'date-fns';
// import { Holiday } from '../types/types';
// import { DATE_FORMAT } from './constants';
// export const formatDate = (date: Date): string => {
//   try {
//     return format(date, DATE_FORMAT);
//   } catch (error) {
//     console.warn('Invalid date:', date);
//     return '';
//   }
// };
// export const getHolidaysForDate = (date: Date, holidays: Holiday[]): Holiday[] => {
//   const dateStr = formatDate(date);
//   if (!dateStr) return [];
//   return holidays.filter(holiday => {
//     try {
//       return formatDate(parseISO(holiday.date)) === dateStr;
//     } catch (error) {
//       console.warn('Invalid holiday date:', holiday.date);
//       return false;
//     }
//   });
// };
// export const getTasksForDate = (date: Date, tasks: any[]) => {
//   const dateStr = formatDate(date);
//   if (!dateStr) return [];
//   return tasks.filter(task => {
//     try {
//       return formatDate(task.date) === dateStr;
//     } catch (error) {
//       console.warn('Invalid task date:', task.date);
//       return false;
//     }
//   });
// };
import { endOfMonth, endOfWeek, format, parseISO, startOfMonth, startOfWeek } from 'date-fns';
import { addMonths, subMonths } from 'date-fns';
import { Holiday, Task } from '../types/types';
import { DATE_FORMAT } from './constants';

export const formatDate = (date: Date): string => {
  return format(date, DATE_FORMAT);
};

export const getTasksForDate = (date: Date, tasks: Task[]) => {
  const dateStr = formatDate(date);
  return tasks.filter(task => formatDate(task.date) === dateStr);
};

export const getHolidaysForDate = (date: Date, holidays: Holiday[]) => {
  const dateStr = formatDate(date);
  return holidays.filter(holiday => formatDate(parseISO(holiday.date)) === dateStr);
};

export const getMonthStartAndEnd = (date: Date) => {
  return { start: startOfMonth(date), end: endOfMonth(date) };
};

export const getWeekStartAndEnd = (date: Date) => {
  return { start: startOfWeek(date), end: endOfWeek(date) };
};

export const changeMonth = (date: Date, direction: 'prev' | 'next') => {
  return direction === 'prev' ? subMonths(date, 1) : addMonths(date, 1);
};
