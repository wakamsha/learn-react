import * as React from 'react';
import { render } from 'react-dom';
// import { TodoApp } from './01-todo-basic/App';
import { TodoApp2 } from './02-todo-with-filter/App';

render(
  // <TodoApp />,
  <TodoApp2 />,
  document.getElementById('app'),
);
