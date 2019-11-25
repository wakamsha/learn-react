import * as React from 'react';
import { Todo as TodoState } from '../reducers';

type Props = {
  todo: TodoState;
  onClick: (id: number) => void;
};

export const Todo = ({ todo, onClick }: Props) => {
  const handleClick = React.useCallback(() => onClick(todo.id), [todo]);

  return (
    <li onClick={handleClick} style={todo.completed ? { textDecoration: 'line-through' } : {}}>
      {todo.completed ? '👌' : '👋'}
      <span>{todo.text}</span>
    </li>
  );
};
