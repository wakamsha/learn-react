import { Todo as TodoState } from '../reducers';
import React from 'react';

type Props = {
  todo: TodoState;
  onClick: (id: number) => void;
};

export const Todo = ({ todo, onClick }: Props) => {
  const handleClick = useCallback(() => onClick(todo.id), [onClick, todo.id]);

  return (
    <li onClick={handleClick} style={todo.completed ? { textDecoration: 'line-through' } : {}}>
      {todo.completed ? '👌' : '👋'}
      <span>{todo.text}</span>
    </li>
  );
};
