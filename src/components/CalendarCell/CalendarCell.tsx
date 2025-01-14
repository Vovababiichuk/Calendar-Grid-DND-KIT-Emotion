import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { format } from 'date-fns';
import { isSameDay, startOfToday } from 'date-fns';
import { Holiday, Task } from '../../types/types';
import { DATE_FORMAT } from '../../utils/constants';
import HolidayItem from '../HolidayItem/HolidayItem';
import TaskItem from '../TaskItem/TaskItem';
import {
  Cell,
  ContentContainer,
  DateLabel,
  Day,
  HolidayList,
  TaskCount,
  TaskList,
} from './CalendarCell.styles';

interface CalendarCellProps {
  date: Date;
  isCurrentMonth: boolean;
  tasks: Task[];
  holidays: Holiday[];
  onDateClick: () => void;
  onEditTask: (taskId: string, newTitle: string) => void;
  onReorderTasks: (tasks: Task[]) => void;
}

const CalendarCell = ({
  date,
  isCurrentMonth,
  tasks,
  holidays,
  onDateClick,
  onEditTask,
}: CalendarCellProps) => {
  const { setNodeRef } = useDroppable({
    id: format(date, DATE_FORMAT),
  });

  const isToday = isSameDay(date, startOfToday());

  return (
    <Cell isCurrentMonth={isCurrentMonth} onClick={onDateClick}>
      <DateLabel isCurrentMonth={isCurrentMonth}>
        <Day isToday={isToday}>{format(date, 'd')}</Day>
        {tasks.length > 0 && (
          <TaskCount>
            {tasks.length} card{tasks.length !== 1 && 's'}
          </TaskCount>
        )}
      </DateLabel>
      <ContentContainer>
        <HolidayList>
          {holidays.map(holiday => (
            <HolidayItem key={`${holiday.date}-${holiday.name}`} holiday={holiday} />
          ))}
        </HolidayList>
        <TaskList ref={setNodeRef}>
          <SortableContext
            items={tasks.map(task => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} onEdit={onEditTask} />
            ))}
          </SortableContext>
        </TaskList>
      </ContentContainer>
    </Cell>
  );
};

export default CalendarCell;
