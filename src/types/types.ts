export type TitleProps = {
  text: string;
};

export type Task = {
  id: string;
  task: string;
  isDone: boolean;
};

export interface ItemProps {
  task: string;
  isDone: boolean;
  toggleTask: (id: string) => void;
}

export interface TasksProps {
  id: string;
  task: string;
  isDone: boolean;
  onToggle: (id: string) => void;
}

export interface ListProps {
  tasks: Task[];
}

export interface TodoContextType {
  tasks: Task[];
  addTask: (task: string) => void;
  toggleTask: (id: string) => void;
}
