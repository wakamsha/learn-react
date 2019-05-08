import * as React from 'react';
import { FetchUsers } from './05-fetch-users/App';
import { render } from 'react-dom';

render(
  // <TodoPrimitive />,
  // <TodoGettingStarted />,
  // <TodoPro />,
  // <TodoWithContext />,
  <FetchUsers />,
  document.getElementById('app'),
);
