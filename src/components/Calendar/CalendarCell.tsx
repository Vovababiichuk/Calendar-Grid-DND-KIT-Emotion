import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { Holiday, Task } from '../../types';
import HolidayItem from './HolidayItem';
import { SortableItem } from './SortableItem';
import TaskItem from './TaskItem';

const Cell = styled.div<{ isCurrentMonth: boolean }>`
  background: ${props => (props.isCurrentMonth ? '#f8fafc' : '#f1f5f9')};
  min-height: 120px;
  height: 120px;
  padding: 8px;
  position: relative;
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: ${props => (props.isCurrentMonth ? '#fff' : '#f8fafc')};
  }
`;

const DateLabel = styled.div<{ isCurrentMonth: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${props => (props.isCurrentMonth ? '#64748b' : '#94a3b8')};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskCount = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
`;

const ContentContainer = styled.div`
  height: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
`;

const HolidayList = styled.div`
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TaskList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #e2e8f0 transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e2e8f0;
    border-radius: 2px;
  }
`;

interface CalendarCellProps {
  date: Date;
  isCurrentMonth: boolean;
  tasks: Task[];
  holidays: Holiday[];
  onDateClick: () => void;
  onEditTask: (task: Task) => void;
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
    id: format(date, 'yyyy-MM-dd'),
  });

  return (
    <Cell isCurrentMonth={isCurrentMonth} onClick={onDateClick}>
      <DateLabel isCurrentMonth={isCurrentMonth}>
        {format(date, 'd')}
        {tasks.length > 0 && (
          <TaskCount>
            {tasks.length} card{tasks.length !== 1 && 's'}
          </TaskCount>
        )}
      </DateLabel>
      <ContentContainer>
        <HolidayList>
          {holidays.map(holiday => (
            <HolidayItem key={holiday.name} holiday={holiday} />
          ))}
        </HolidayList>
        <TaskList ref={setNodeRef}>
          <SortableContext
            items={tasks.map(task => task.id)}
            strategy={verticalListSortingStrategy}
            id={format(date, 'yyyy-MM-dd')}
          >
            {tasks.map(task => (
              <SortableItem key={task.id} id={task.id}>
                <TaskItem task={task} onEdit={() => onEditTask(task)} />
              </SortableItem>
            ))}
          </SortableContext>
        </TaskList>
      </ContentContainer>
    </Cell>
  );
};

export default CalendarCell;
