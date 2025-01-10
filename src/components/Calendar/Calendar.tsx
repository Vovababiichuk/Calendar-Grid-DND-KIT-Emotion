import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
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
import { useTaskManagement } from '../../hooks/useTaskManagement';
import { Holiday } from '../../types';
import { Task } from '../../types';
import { fetchHolidays } from '../../utils/api';
import CalendarCell from './CalendarCell';
import SearchBar from './SearchBar';
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
} from './styles';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(startOfToday());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'week'>('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [draggingTask, setDraggingTask] = useState<Task | null>(null);

  const {
    tasks,
    selectedTask,
    setSelectedTask,
    handleCreateTask,
    handleUpdateTask,
    handleEditTask,
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

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const task = tasks.find(t => t.id === taskId);
    if (task) setDraggingTask(task);
  };

  const handleDragEndForDate = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const date = new Date(over.id as string);
    setTasks(prevTasks => {
      const taskIndex = prevTasks.findIndex(task => task.id === taskId);
      if (taskIndex === -1) return prevTasks;

      const newTasks = [...prevTasks];
      newTasks[taskIndex] = {
        ...newTasks[taskIndex],
        date,
      };

      return newTasks;
    });
  };

  const handleDragEndForReordering = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTasks(prevTasks => {
      const oldIndex = prevTasks.findIndex(task => task.id === active.id);
      const newIndex = prevTasks.findIndex(task => task.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedTasks = [...prevTasks];
        const [movedTask] = updatedTasks.splice(oldIndex, 1);
        updatedTasks.splice(newIndex, 0, movedTask);
        return updatedTasks;
      }

      return prevTasks;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    if (!over) return;

    // Перевіряємо, чи `over.id` є датою у форматі 'yyyy-MM-dd'
    const isDate = /^\d{4}-\d{2}-\d{2}$/.test(String(over.id));

    if (isDate) {
      handleDragEndForDate(event);
    } else {
      handleDragEndForReordering(event);
    }
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
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
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
              tasks={filteredTasks.filter(
                task => format(task.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'),
              )}
              holidays={holidays.filter(holiday => holiday.date === format(day, 'yyyy-MM-dd'))}
              onDateClick={() => {
                setSelectedDate(day);
                setSelectedTask(undefined);
              }}
              onEditTask={handleEditTask}
            />
          ))}
        </Grid>

        <DragOverlay>
          {draggingTask ? <TaskItem task={draggingTask} onEdit={() => {}} /> : null}
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
