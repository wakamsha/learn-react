import * as React from 'react';
import { PreventingTransitions } from './5-preventing-transitions/PreventingTransitions';
import { render } from 'react-dom';

render(
  // <Basic />,
  // <Redirects />,
  // <CustomLink />,
  <PreventingTransitions />,
  document.getElementById('app'),
);
