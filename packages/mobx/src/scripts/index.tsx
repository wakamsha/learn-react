import * as React from 'react';
import { TodoGettingStarted } from './02-todo-getting-started/App';
import { render } from 'react-dom';

render(
  // <TodoPrimitive />,
  <TodoGettingStarted />,
  // <TodoPro />,
  // <TodoWithContext />,
  // <FetchUsers />,
  document.getElementById('app'),
);
