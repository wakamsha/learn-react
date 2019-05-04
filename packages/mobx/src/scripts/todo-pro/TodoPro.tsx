import * as React from 'react';
import { Provider } from 'mobx-react';
import { Stores } from './stores';
import { TodoAdd } from './components/TodoAdd';
import { TodoList } from './components/TodoList';

export const TodoPro = () => (
  <Provider store={Stores.todoListStore}>
    <>
      <TodoAdd />
      <TodoList />
    </>
  </Provider>
);
