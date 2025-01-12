import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import styled from '@emotion/styled';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTaskManagement } from '../../hooks/useTaskManagement';
import { fetchHolidays } from '../../gateway/api.ts';
import { Holiday, Task } from '../../types/types.ts';
import { getHolidaysForDate, getTasksForDate } from '../../utils/dateUtils';
import CalendarCell from '../CalendarCell/CalendarCell';
import SearchBar from '../SearchBar/SearchBar';
import TaskItem from '../TaskItem/TaskItem';
import TaskModal from '../TaskModal/TaskModal';
import {
  CalendarContainer,
  Grid,
  Header,
  IconButton,
  MonthNavigation,
  MonthTitle,
  TodayButton,
  ViewButton,
  ViewControls,
  WeekdayHeader,
} from './Calendar.styles.ts';

const DeleteZone = styled.div<{ isVisible: boolean; isOver: boolean }>`
  position: fixed;
  height: 50px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => (props.isOver ? '#ef4444' : '#fee2e2')};
  color: ${props => (props.isOver ? 'white' : '#ef4444')};
  padding: 12px 24px 12px 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};
  transition: all 0.2s ease-in-out;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);

  &:hover {
    background: #ef4444;
    color: white;
  }
`;

const DeleteText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DELETE_ZONE_ID = 'delete-zone';

function DeleteDropZone({ isVisible }: { isVisible: boolean }) {
  const { setNodeRef, isOver } = useDroppable({
    id: DELETE_ZONE_ID,
  });

  return (
    <DeleteZone ref={setNodeRef} isVisible={isVisible} isOver={isOver}>
      <Trash2 className="absolute top-4 left-2 z-10" size={18} />
      <DeleteText>Drop here to delete task</DeleteText>
    </DeleteZone>
  );
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(startOfToday());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'week'>('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    tasks,
    selectedTask,
    setSelectedTask,
    handleCreateTask,
    handleUpdateTask,
    handleEditTask: handleTaskEdit,
    setTasks,
  } = useTaskManagement();

  useEffect(() => {
    const loadHolidays = async () => {
      const year = currentDate.getFullYear();
      const data = await fetchHolidays(year, 'US');
      setHolidays(data);
    };
    loadHolidays();
  }, [currentDate]);

  const days = React.useMemo(() => {
    const start =
      view === 'week' ? startOfWeek(currentDate) : startOfWeek(startOfMonth(currentDate));
    const end = view === 'week' ? endOfWeek(currentDate) : endOfWeek(endOfMonth(currentDate));

    return eachDayOfInterval({ start, end });
  }, [currentDate, view]);

  const filteredTasks = React.useMemo(() => {
    if (!searchTerm) return tasks;
    return tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [tasks, searchTerm]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    if (task) {
      setActiveTask(task);
      setIsDragging(true);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id === DELETE_ZONE_ID) {
      // Delete the task
      setTasks(prevTasks => prevTasks.filter(task => task.id !== active.id));
    } else if (over) {
      const taskId = active.id as string;
      const overId = over.id as string;

      // Check if this is a reorder within the same date
      const activeTask = tasks.find(t => t.id === taskId);
      const overTask = tasks.find(t => t.id === overId);

      if (
        activeTask &&
        overTask &&
        format(activeTask.date, 'yyyy-MM-dd') === format(overTask.date, 'yyyy-MM-dd')
      ) {
        const oldIndex = tasks.findIndex(t => t.id === taskId);
        const newIndex = tasks.findIndex(t => t.id === overId);

        setTasks(prevTasks => arrayMove(prevTasks, oldIndex, newIndex));
      } else {
        // This is a move to a different date
        const date = new Date(overId);
        setTasks(prevTasks => {
          const taskIndex = prevTasks.findIndex(t => t.id === taskId);
          if (taskIndex === -1) return prevTasks;

          const newTasks = [...prevTasks];
          newTasks[taskIndex] = {
            ...newTasks[taskIndex],
            date,
          };

          return newTasks;
        });
      }
    }

    setActiveTask(null);
    setIsDragging(false);
  };

  const handleTaskClick = (date: Date, task?: Task) => {
    setSelectedDate(date);
    setSelectedTask(task);
  };

  const handleReorderTasks = (newTasks: Task[]) => {
    setTasks(prevTasks => {
      const otherTasks = prevTasks.filter(task => !newTasks.find(t => t.id === task.id));
      return [...otherTasks, ...newTasks];
    });
  };

  const goToToday = () => setCurrentDate(startOfToday());

  return (
    <CalendarContainer>
      <Header>
        <MonthNavigation>
          <IconButton onClick={() => setCurrentDate(d => subMonths(d, 1))}>
            <ChevronLeft size={20} />
          </IconButton>
          <MonthTitle>{format(currentDate, 'MMMM yyyy')}</MonthTitle>
          <IconButton onClick={() => setCurrentDate(d => addMonths(d, 1))}>
            <ChevronRight size={20} />
          </IconButton>
          <TodayButton onClick={goToToday}>Today</TodayButton>
        </MonthNavigation>

        <ViewControls>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <ViewButton active={view === 'week'} onClick={() => setView('week')}>
            Week
          </ViewButton>
          <ViewButton active={view === 'month'} onClick={() => setView('month')}>
            Month
          </ViewButton>
        </ViewControls>
      </Header>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Grid isWeekView={view === 'week'}>
          {weekdays.map(day => (
            <WeekdayHeader key={day}>{day}</WeekdayHeader>
          ))}
          {days.map(day => (
            <CalendarCell
              key={format(day, 'yyyy-MM-dd')}
              date={day}
              isCurrentMonth={isSameMonth(day, currentDate)}
              tasks={getTasksForDate(day, filteredTasks)}
              holidays={getHolidaysForDate(day, holidays)}
              onDateClick={() => handleTaskClick(day)}
              onEditTask={(taskId, newTitle) => {
                setTasks(prevTasks =>
                  prevTasks.map(task => (task.id === taskId ? { ...task, title: newTitle } : task)),
                );
              }}
              onReorderTasks={handleReorderTasks}
            />
          ))}
        </Grid>

        <DeleteDropZone isVisible={isDragging} />

        <DragOverlay>
          {activeTask ? <TaskItem task={activeTask} onEdit={() => {}} isDragging /> : null}
        </DragOverlay>
      </DndContext>

      {selectedDate && (
        <TaskModal
          date={selectedDate}
          task={selectedTask}
          onClose={() => {
            setSelectedDate(null);
            setSelectedTask(undefined);
          }}
          onCreateTask={(title, colors) => handleCreateTask(title, colors, selectedDate)}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </CalendarContainer>
  );
};

export default Calendar;
