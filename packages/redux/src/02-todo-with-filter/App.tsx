import { AddTodoContainer } from './views/containers/AddTodoContainer';
import { FilterContainer } from './views/containers/FilterContainer';
import { Provider } from 'react-redux';
import { TodoListContainer } from './views/containers/TodoListContainer';
import { store } from './state/store';
import React from 'react';

export const TodoApp2 = () => (
  <Provider store={store}>
    <h1>todo app2</h1>
    <AddTodoContainer />
    <FilterContainer />
    <TodoListContainer />
  </Provider>
);
