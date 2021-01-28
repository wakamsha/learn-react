import React from 'react';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { AddTodoContainer } from './containers/AddTodoContainer';
import { TodoListContainer } from './containers/TodoListContainer';
import { Todo, initialState, todos } from './reducers';

const store: Store<Todo[]> = createStore(todos, initialState);

export const TodoApp = () => (
  <Provider store={store}>
    <h1>todo app</h1>
    <AddTodoContainer />
    <TodoListContainer />
  </Provider>
);
