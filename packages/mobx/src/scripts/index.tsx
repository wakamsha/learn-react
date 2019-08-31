import * as React from 'react';
import { TodoWithContext } from './04-todo-with-context/App';
import { render } from 'react-dom';

render(
  // <TodoPrimitive />,
  // <TodoGettingStarted />,
  // <TodoPro />,
  <TodoWithContext />,
  // <FetchUsers />,
  document.getElementById('app'),
);
