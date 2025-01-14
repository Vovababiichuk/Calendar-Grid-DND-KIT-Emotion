import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { format } from 'date-fns';
import { useState } from 'react';
import { Task } from '../types/types';
import { DATE_FORMAT, DELETE_ZONE_ID } from '../utils/constants';

export const useDragAndDrop = (
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(task => task.id === active.id);
    if (task) {
      setActiveTask(task);
      setIsDragging(true);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id === DELETE_ZONE_ID) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== active.id));
    } else if (over) {
      const taskId = active.id as string;
      const overId = over.id as string;

      const activeTask = tasks.find(task => task.id === taskId);
      const overTask = tasks.find(task => task.id === overId);

      if (
        activeTask &&
        overTask &&
        format(activeTask.date, DATE_FORMAT) === format(overTask.date, DATE_FORMAT)
      ) {
        const oldIndex = tasks.findIndex(task => task.id === taskId);
        const newIndex = tasks.findIndex(task => task.id === overId);

        setTasks(prevTasks => arrayMove(prevTasks, oldIndex, newIndex));
      } else {
        const date = new Date(overId);
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
      }
    }

    setActiveTask(null);
    setIsDragging(false);
  };

  return {
    isDragging,
    activeTask,
    handleDragStart,
    handleDragEnd,
  };
};
