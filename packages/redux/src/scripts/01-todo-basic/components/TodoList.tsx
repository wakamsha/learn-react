import * as React from 'react';
import { Todo } from './Todo';
import { Todo as TodoState } from '../reducers';

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
