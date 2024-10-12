import React, { useState } from 'react';
import './App.css';
import Title from './components/Title';
import List from './components/List';
import { useTodo } from './context/todoContext';

function App() {
  const [newTask, setNewTask] = useState('');
  const { addTask } = useTodo();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask(newTask);
      setNewTask('');
    }
  };

  return (
    <article className="font-comfortaa flex flex-col items-center">
      <Title text={'To-do list'} />
      <input
        autoFocus
        type="text"
        placeholder="Добавь задачу"
        className="p-2 rounded-3xl border-2 border-solid border-zinc-400 w-72 h-10 focus:outline-none focus:ring focus:border-blue-500"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="my-3 bg-blue-300 w-32 h-10 rounded-3xl hover:border-2 border-solid border-blue-500"
        onClick={() => {
          addTask(newTask)
          setNewTask('');
        }
        }
      >
        Добавить
      </button>
      <List />
    </article>
  );
}

export default App;
