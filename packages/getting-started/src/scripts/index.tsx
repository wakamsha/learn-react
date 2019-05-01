import * as React from 'react';
import { Timer } from './components/Timer';
import { render } from 'react-dom';
// import { HelloMessage } from './components/HelloMessage';

render(
  // <HelloMessage name="wakamsha" />,
  <Timer />,
  document.getElementById('app'),
);
