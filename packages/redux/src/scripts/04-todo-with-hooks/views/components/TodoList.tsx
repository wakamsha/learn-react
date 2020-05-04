import { Todo } from './Todo';
import { Todo as TodoState } from '../../state/todos/reducers';
import React from 'react';

export type Props = {
  todos: TodoState[];
  onClick: (id: number) => void;
};

export const TodoList = ({ todos, onClick }: Props) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} todo={todo} onClick={() => onClick(todo.id)} />
    ))}
  </ul>
);
