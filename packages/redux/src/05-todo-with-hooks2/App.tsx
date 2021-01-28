import React from 'react';
import { Provider } from 'react-redux';
import { AddTodo } from './components/AddTodo';
import { Filters } from './components/Filters';
import { TodoList } from './components/TodoList';
import { store } from './states/store';

export const TodoApp5 = () => (
  <Provider store={store}>
    <h1>Todo App 05</h1>
    <AddTodo />
    <Filters />
    <TodoList />
  </Provider>
);
