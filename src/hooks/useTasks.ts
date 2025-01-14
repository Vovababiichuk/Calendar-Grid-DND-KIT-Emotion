// import { useState } from 'react';
// import { Task } from '../types/types';

// export const useTasks = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);

//   const handleCreateTask = (title: string, colors: string[], date: Date) => {
//     const newTask = { id: Date.now().toString(), title, date, colors };
//     setTasks(prev => [...prev, newTask]);
//   };

//   const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
//     setTasks(prev => prev.map(task => (task.id === taskId ? { ...task, ...updatedTask } : task)));
//   };

//   return {
//     tasks,
//     setTasks,
//     handleCreateTask,
//     handleUpdateTask,
//   };
// };
