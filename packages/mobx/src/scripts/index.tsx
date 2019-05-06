import * as React from 'react';
import { TodoWithContext } from './todo-with-context/TodoWithContext';
import { render } from 'react-dom';

render(
  // <PrimitiveTodo />,
  // <TodoApp />,
  // <TodoPro />,
  <TodoWithContext />,
  document.getElementById('app'),
);
