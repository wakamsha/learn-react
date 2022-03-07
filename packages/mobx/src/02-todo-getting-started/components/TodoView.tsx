/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import type { Todo } from '../stores/TodoStore';

type Props = {
  todo: Todo;
};

export const TodoView = observer(({ todo }: Props) => {
  const handleToggleCompleted = useCallback(() => (todo.completed = !todo.completed), [todo]);
  const handleRename = useCallback(() => (todo.task = prompt(`Task name!`, todo.task) || todo.task), [todo]);

  return (
    <li onDoubleClick={handleRename}>
      <input type="checkbox" checked={todo.completed} onChange={handleToggleCompleted} />
      {todo.task}
      {todo.assignee ? <small>{todo.assignee}</small> : null}
    </li>
  );
});
