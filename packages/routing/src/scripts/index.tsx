import * as React from 'react';
import { SidebarApp } from './08-sidebar/SidebarApp';
import { render } from 'react-dom';

render(
  // <Basic />,
  // <Redirects />,
  // <CustomLink />,
  // <PreventingTransitions />,
  // <NoMatchApp />,
  <SidebarApp />,
  document.getElementById('app'),
);
