import React, { createContext, useContext, useState, ReactNode } from 'react';
import uniqueId from 'lodash.uniqueid';
import { TodoContextType, Task } from '../types/types';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: string) => {
    if (task.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: uniqueId(), task, isDone: false },
      ]);
    }
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  return (
    <TodoContext.Provider value={{ tasks, addTask, toggleTask }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a Provider');
  }
  return context;
};
