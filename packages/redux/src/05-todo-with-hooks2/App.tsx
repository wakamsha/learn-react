import { AddTodo } from './components/AddTodo';
import { Filters } from './components/Filters';
import { Provider } from 'react-redux';
import { TodoList } from './components/TodoList';
import { store } from './states/store';
import React from 'react';

export const TodoApp5 = () => (
  <Provider store={store}>
    <h1>Todo App 05</h1>
    <AddTodo />
    <Filters />
    <TodoList />
  </Provider>
);
