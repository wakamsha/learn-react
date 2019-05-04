import * as React from 'react';
import { TodoPro } from './todo-pro/TodoPro';
import { render } from 'react-dom';

render(
  // <PrimitiveTodo />,
  // <TodoApp />,
  <TodoPro />,
  document.getElementById('app'),
);
