import * as React from 'react';
import { TodoWithContext } from './04-todo-with-context/App';
import { render } from 'react-dom';

render(
  // <PrimitiveTodo />,
  // <TodoApp />,
  // <TodoPro />,
  <TodoWithContext />,
  document.getElementById('app'),
);
