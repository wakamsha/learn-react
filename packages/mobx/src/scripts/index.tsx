import * as React from 'react';
import { TodoApp } from './todo/TodoApp';
import { render } from 'react-dom';

render(
  // <PrimitiveTodo />,
  <TodoApp />,
  document.getElementById('app'),
);
