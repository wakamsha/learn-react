import { AsyncWithFC } from './06-async-with-fc/App';
import { applyGlobalStyle } from '@learn-react/core/helpers/Style';
import { render } from 'react-dom';
import React from 'react';

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
