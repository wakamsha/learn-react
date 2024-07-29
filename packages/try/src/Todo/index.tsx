import { css } from '@emotion/css';
import { useState } from 'react';
import { AddForm } from './AddForm';
import { List } from './List';
import { type Todo } from './type';

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([{ id: makeId('todo'), title: 'Implement Todo App', completed: false }]);

  const handleTodoAdd = (title: string) => {
    setTodos((previousTodos) => [...previousTodos, { id: makeId('todo'), title, completed: false }]);
  };

  const handleTodoCompleted = (id: Todo['id'], completed: Todo['completed']) => {
    setTodos((previousTodos) => previousTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)));
  };

  const handleTodoDelete = (id: Todo['id']) => {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styleRoot}>
      <AddForm onAdd={handleTodoAdd} />
      <List todos={todos} onStatusToggle={handleTodoCompleted} onDelete={handleTodoDelete} />
    </div>
  );
};

function makeId(prefix: string): string {
  return `${prefix}-${Math.floor(Math.random() * 1e10).toString()}`;
}

const styleRoot = css`
  display: grid;
  gap: 16px;
  max-width: 400px;
`;
