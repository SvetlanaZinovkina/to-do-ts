import React, { useState } from 'react';
import { useTodo } from '../context/todoContext';
import Item from './Item';

const List: React.FC = () => {
  const { tasks, toggleTask } = useTodo();
  const [status, setStatus] = useState<'all' | 'done' | 'undone'>('all');

  const buttonOptions = [
    { label: 'Все', value: 'all' },
    { label: 'Выполненные', value: 'done' },
    { label: 'Невыполненные', value: 'undone' }
  ];

  const filteredTasks = tasks.filter((task) => {
    if (status === 'done') return task.isDone;
    if (status === 'undone') return !task.isDone;
    return true;
  });

  return (<>
    <div className="flex space-x-2">
      {buttonOptions.map((option) => (
        <button
          key={option.value}
          className={`p-2 rounded ${status === option.value ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setStatus(option.value as 'all' | 'done' | 'undone')}
        >
          {option.label}
        </button>
      ))}
    </div>
    <ul className="flex flex-col w-full my-5">
      {filteredTasks.map((item) => {
        const { id, task, isDone } = item;
        return (
          <Item id={id} task={task} isDone={isDone} onToggle={toggleTask} />
        );
      })}
    </ul>
  </>
  );
};

export default List;
