// import { NotificationApp } from './06-notification/App';
import { TodoApp5 } from './05-todo-with-hooks2/App';
import { render } from 'react-dom';
import React from 'react';
// import { TodoApp } from './01-todo-basic/App';
// import { TodoApp2 } from './02-todo-with-filter/App';
// import { TodoApp4 } from './04-todo-with-hooks/App';
// import { Counter } from './03-counter-with-hooks/App';

render(
  // <TodoApp />,
  // <TodoApp2 />,
  // <Counter />,
  // <TodoApp4 />,
  <TodoApp5 />,
  // <NotificationApp />,
  document.getElementById('app'),
);
