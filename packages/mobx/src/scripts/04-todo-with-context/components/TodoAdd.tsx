import { TodoListStore } from '../stores/TodoListStore';
import { observer } from 'mobx-react';
import React from 'react';

type Props = {
  store: TodoListStore;
};

export const TodoAdd = observer(({ store }: Props) => {
  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => store.setTask(e.target.value);
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!store.task) return;
    store.addTodo();
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label>New Task: </label>
      <input value={store.task} onChange={handleTaskChange} />
      <button>Add</button>
    </form>
  );
});
