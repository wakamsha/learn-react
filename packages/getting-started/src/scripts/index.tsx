import * as React from 'react';
import { render } from 'react-dom';
// import { Timer } from './components/Timer';
// import { MarkdownEditor } from './components/Markdowneditor';
// import { HelloMessage } from './components/HelloMessage';
import { Todo } from './components/Todo';

render(
  // <HelloMessage name="wakamsha" />,
  // <Timer />,
  <Todo />,
  // <MarkdownEditor />,
  document.getElementById('app'),
);
