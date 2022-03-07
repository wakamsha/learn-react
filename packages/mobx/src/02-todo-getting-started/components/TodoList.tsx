/* eslint-disable no-alert */
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import type { TodoStore } from '../stores/TodoStore';
import { TodoView } from './TodoView';

type Props = {
  store: TodoStore;
};

export const TodoList = observer(({ store }: Props) => {
  const handleClick = useCallback(() => store.addTodo(prompt(`Enter a new Todo:`, 'コーヒー入れる!') || ''), [store]);

  const handleClickAsync = useCallback(() => {
    store.addPendingRequests(1);
    setTimeout(() => {
      store.addTodo(`Random Todo - ${Math.random()}`);
      store.addPendingRequests(-1);
    }, 2000);
  }, [store]);

  return (
    <>
      <p>{store.report}</p>
      <ul>
        {store.todos.map((todo, i) => (
          <TodoView key={i} todo={todo} />
        ))}
      </ul>
      {store.pendingRequests ? <strong>Loading...</strong> : null}
      <button onClick={handleClick}>New Todo</button>
      <hr />
      <button onClick={handleClickAsync}>Add Todo Async!</button>
    </>
  );
});
