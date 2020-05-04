import { TodoStore } from '../stores/TodoStore';
import { observer } from 'mobx-react';
import React from 'react';

type Props = {
  todo: TodoStore;
};

export const TodoView = observer(({ todo }: Props) => {
  const handleToggleCompleted = () => todo.toggleCompleted();
  const handleRename = () => todo.updateTask(prompt(`Task name`, todo.task) || todo.task);

  return (
    <li onDoubleClick={handleRename}>
      <input type="checkbox" checked={todo.completed} onChange={handleToggleCompleted} />
      {todo.task}
    </li>
  );
});
