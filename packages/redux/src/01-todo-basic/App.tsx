import { AddTodoContainer } from './containers/AddTodoContainer';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { Todo, initialState, todos } from './reducers';
import { TodoListContainer } from './containers/TodoListContainer';
import React from 'react';

const store: Store<Todo[]> = createStore(todos, initialState);

export const TodoApp = () => (
  <Provider store={store}>
    <h1>todo app</h1>
    <AddTodoContainer />
    <TodoListContainer />
  </Provider>
);
