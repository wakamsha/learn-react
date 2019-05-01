import * as React from 'react';
// import { Timer } from './components/Timer';
import { Todo } from './components/Todo';
import { render } from 'react-dom';

render(
  // <HelloMessage name="wakamsha" />,
  // <Timer />,
  <Todo />,
  document.getElementById('app'),
);
