import { format, isSameMonth } from 'date-fns';
import { Holiday, Task } from '@/types/types';
import { DATE_FORMAT, WEEK_DAYS } from '../../utils/constants';
import { getHolidaysForDate, getTasksForDate } from '../../utils/dateUtils';
import { Grid, WeekdayHeader } from '../Calendar/Calendar.styles';
import CalendarCell from '../CalendarCell/CalendarCell';

interface CalendarGridProps {
  days: Date[];
  currentDate: Date;
  filteredTasks: Task[];
  holidays: Holiday[];
  onDateClick: (date: Date) => void;
  onEditTask: (taskId: string, newTitle: string) => void;
  onReorderTasks: (newTasks: Task[]) => void;
  isWeekView: boolean;
}

const CalendarGrid = ({
  days,
  currentDate,
  filteredTasks,
  holidays,
  onDateClick,
  onEditTask,
  onReorderTasks,
  isWeekView,
}: CalendarGridProps) => {
  return (
    <Grid isWeekView={isWeekView}>
      {WEEK_DAYS.map(day => (
        <WeekdayHeader key={day}>{day}</WeekdayHeader>
      ))}
      {days.map(day => (
        <CalendarCell
          key={format(day, DATE_FORMAT)}
          date={day}
          isCurrentMonth={isSameMonth(day, currentDate)}
          tasks={getTasksForDate(day, filteredTasks)}
          holidays={getHolidaysForDate(day, holidays)}
          onDateClick={() => onDateClick(day)}
          onEditTask={onEditTask}
          onReorderTasks={onReorderTasks}
        />
      ))}
    </Grid>
  );
};

export default CalendarGrid;
