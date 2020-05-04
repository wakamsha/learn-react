import { Provider } from 'mobx-react';
import { Stores } from './stores';
import { TodoAdd } from './components/TodoAdd';
import { TodoList } from './components/TodoList';
import React from 'react';

export const TodoPro = () => (
  <>
    <h1>Todo - Using Inject</h1>
    <Provider store={Stores.todoListStore}>
      <>
        <TodoAdd />
        <TodoList />
      </>
    </Provider>
  </>
);
