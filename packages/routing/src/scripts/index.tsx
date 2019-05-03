import * as React from 'react';
import { NoMatchApp } from './6-no-match/NoMatchApp';
import { render } from 'react-dom';

render(
  // <Basic />,
  // <Redirects />,
  // <CustomLink />,
  // <PreventingTransitions />,
  <NoMatchApp />,
  document.getElementById('app'),
);
