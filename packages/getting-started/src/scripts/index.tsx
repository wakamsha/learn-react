import * as React from 'react';
// import { NumberList } from './components/NumberList';
import { render } from 'react-dom';
// import { NameForm } from './components/NameForm';
// import { FlavorForm } from './components/FlavorForm';
import { Reservation } from './components/Reservation';
// import { Timer } from './components/Timer';
// import { MarkdownEditor } from './components/Markdowneditor';
// import { HelloMessage } from './components/HelloMessage';
// import { Todo } from './components/Todo';
// import { LoginControl } from './components/LoginControl';

render(
  // <HelloMessage name="wakamsha" />,
  // <Timer />,
  // <Todo />,
  // <MarkdownEditor />,
  // <LoginControl />,
  // <NumberList numbers={[1, 2, 3, 4, 5]} />,
  // <NameForm />,
  // <FlavorForm />,
  <Reservation />,
  document.getElementById('app'),
);
