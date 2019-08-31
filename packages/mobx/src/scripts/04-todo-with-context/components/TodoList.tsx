import * as React from 'react';
import { TodoListStore } from '../stores/TodoListStore';
import { TodoView } from './TodoView';
import { observer } from 'mobx-react';

type Props = {
  store: TodoListStore;
};

export const TodoList = observer(({ store }: Props) => (
  <>
    <p>{store.report}</p>
    <ul>
      {store.todos.map((todo, i) => (
        <TodoView key={i} todo={todo} />
      ))}
    </ul>
  </>
));
