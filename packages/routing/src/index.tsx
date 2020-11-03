import { RoutingProviderApp } from './32-routing-provider';
import { applyGlobalStyle } from '@learn-react/core/helpers/Style';
import { render } from 'react-dom';
import React from 'react';

applyGlobalStyle();

render(
  // <Basic />,
  // <Redirects />,
  // <CustomLink />,
  // <PreventingTransitions />,
  // <NoMatchApp />,
  // <SidebarApp />,
  // <QueryParams />,
  // <MobxBasicApp />,
  // <MobxHooksApp />,
  // <HistoryAPIApp />,
  <RoutingProviderApp />,
  document.getElementById('app'),
);
