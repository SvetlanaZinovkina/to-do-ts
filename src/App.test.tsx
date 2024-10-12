import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from './context/todoContext';
import Item from './components/Item';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <Provider>
      {ui}
    </Provider>
  );
};

test('add new task', () => {
  renderWithProvider(<App />);
  const input = screen.getByPlaceholderText('Добавь задачу');

  fireEvent.change(input, { target: { value: 'New Task' } });

  const button = screen.getByText('Добавить');

  fireEvent.click(button);

  expect(screen.getByText('New Task')).toBeInTheDocument();
});

test('toggles task completion on checkbox click', () => {
  const mockToggle = jest.fn();
  const task = { id: '1', task: 'Test Task', isDone: false };

  render(
    <Item
      id={task.id}
      task={task.task}
      isDone={task.isDone}
      onToggle={mockToggle}
    />
  );

  const checkbox = screen.getByTestId(`checkbox-${task.id}`);

  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);

  expect(mockToggle).toHaveBeenCalledWith(task.id);
});

describe('List component', () => {
  test('displays all tasks by default', () => {

    renderWithProvider(<App />);
    const input = screen.getByPlaceholderText('Добавь задачу');
    const button = screen.getByText('Добавить');
    const buttonDone = screen.getByText('Выполненные');
    const buttonUndone = screen.getByText('Невыполненные');
    const buttonAll = screen.getByText('Все');


    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: 'Task 2' } });
    fireEvent.click(button);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    fireEvent.click(buttonDone);

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();

    fireEvent.click(buttonUndone);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    fireEvent.click(buttonAll);

    const taskFirst = screen.getByTestId(`checkbox-2`);
    fireEvent.click(taskFirst);

    fireEvent.click(buttonDone);

    expect(taskFirst).toBeInTheDocument();

    fireEvent.click(buttonUndone);
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});