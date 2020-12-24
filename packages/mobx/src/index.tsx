import { applyGlobalStyle } from '@learn-react/core/helpers/Style';
import { render } from 'react-dom';
import { AsyncWithFC } from './06-async-with-fc/App';

applyGlobalStyle();

render(
  // <TodoPrimitive />,
  // <TodoGettingStarted />,
  // <TodoPro />,
  // <TodoWithContext />,
  // <AsyncWithCC />,
  <AsyncWithFC />,
  document.getElementById('app'),
);
