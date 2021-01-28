import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { AddTodoContainer } from './views/containers/AddTodoContainer';
import { FilterContainer } from './views/containers/FilterContainer';
import { TodoListContainer } from './views/containers/TodoListContainer';

export const TodoApp4 = () => (
  <Provider store={store}>
    <h1>todo app 04</h1>
    <AddTodoContainer />
    <FilterContainer />
    <TodoListContainer />
  </Provider>
);
