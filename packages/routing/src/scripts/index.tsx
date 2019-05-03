import * as React from 'react';
import { Basic } from './01-basic/Basic';
import { render } from 'react-dom';

render(
  <Basic />,
  // <Redirects />,
  // <CustomLink />,
  // <PreventingTransitions />,
  // <NoMatchApp />,
  // <SidebarApp />,
  // <QueryParams />,
  document.getElementById('app'),
);
