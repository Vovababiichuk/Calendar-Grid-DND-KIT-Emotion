import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDragAndDrop } from '../../hooks/useDragAndDrop.ts';
import { useTaskManagement } from '../../hooks/useTaskManagement';
import { fetchHolidays } from '../../gateway/api.ts';
import { Holiday, Task } from '../../types/types.ts';
import { DATE_FORMAT, WEEK_DAYS } from '../../utils/constants';
import { getHolidaysForDate, getTasksForDate } from '../../utils/dateUtils';
import CalendarCell from '../CalendarCell/CalendarCell';
import DeleteDropZone from '../DeleteZone/DeleteZone.tsx';
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

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(startOfToday());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'week'>('month');
  const [searchTerm, setSearchTerm] = useState('');

  const { tasks, selectedTask, setSelectedTask, handleCreateTask, handleUpdateTask, setTasks } =
    useTaskManagement();

  const { isDragging, activeTask, handleDragStart, handleDragEnd } = useDragAndDrop(
    tasks,
    setTasks,
  );

  useEffect(() => {
    const loadHolidays = async () => {
      const year = currentDate.getFullYear();
      const data = await fetchHolidays(year, 'US');
      setHolidays(data);
    };
    loadHolidays();
  }, [currentDate]);

  const days = useMemo(() => {
    const start =
      view === 'week' ? startOfWeek(currentDate) : startOfWeek(startOfMonth(currentDate));
    const end = view === 'week' ? endOfWeek(currentDate) : endOfWeek(endOfMonth(currentDate));

    return eachDayOfInterval({ start, end });
  }, [currentDate, view]);

  const filteredTasks = useMemo(() => {
    if (!searchTerm) return tasks;
    return tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [tasks, searchTerm]);

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
      <ToastContainer />
    </CalendarContainer>
  );
};

export default Calendar;
