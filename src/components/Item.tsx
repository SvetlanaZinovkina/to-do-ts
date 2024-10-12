import React from 'react';
import { TasksProps } from '../types/types';

const Item: React.FC<TasksProps> = ({ id, task, isDone, onToggle }) => {
  return (
    <li className="flex items-center" key={id}>
      <input
        data-testid={`checkbox-${id}`}
        type="checkbox"
        checked={isDone}
        onClick={() => onToggle(id)}
        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={`checkbox-${id}`}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      ></label>
      <span className={isDone ? 'line-through text-gray-500' : ''}>{task}</span>
    </li>
  );
};

export default Item;
