import { useState } from 'react';
import { Task } from '../types';

export const useTaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const handleCreateTask = (title: string, colors: string[], date: Date) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      date,
      order: tasks.length,
      colors,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (taskId: string, title: string, colors: string[]) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, title, colors }
          : task
      )
    );
    setSelectedTask(undefined);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
  };

  return {
    tasks,
    selectedTask,
    setSelectedTask,
    handleCreateTask,
    handleUpdateTask,
    handleEditTask,
    setTasks,
  };
};