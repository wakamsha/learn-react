import * as React from 'react';
import { AddTodoContainer } from './views/containers/AddTodoContainer';
import { FilterContainer } from './views/containers/FilterContainer';
import { Provider } from 'react-redux';
import { TodoListContainer } from './views/containers/TodoListContainer';
import { store } from './state/store';

export const TodoApp4 = () => (
  <Provider store={store}>
    <h1>todo app 04</h1>
    <AddTodoContainer />
    <FilterContainer />
    <TodoListContainer />
  </Provider>
);
