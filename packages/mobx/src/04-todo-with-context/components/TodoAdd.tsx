import { observer } from 'mobx-react';
import { ChangeEvent, FormEvent } from 'react';
import { TodoListStore } from '../stores/TodoListStore';

type Props = {
  store: TodoListStore;
};

export const TodoAdd = observer(({ store }: Props) => {
  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => store.setTask(e.target.value);
  const handleAddTodo = (e: FormEvent) => {
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
