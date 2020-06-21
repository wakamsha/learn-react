import { RoutingProviderApp } from './42-routing-provider';
import { injectGlobal } from 'emotion';
import { render } from 'react-dom';
import React from 'react';

injectGlobal({
  '*, *:before, *:after': {
    boxSizing: 'border-box',
  },

  html: {
    fontFamily: 'sans-serif',
    lineHeight: 1.15,
    WebkitTextSizeAdjust: '100%',
    msTextSizeAdjust: '100%',
    msOverflowStyle: 'scrollbar',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    overflowX: 'hidden',
  },

  // Scaffolding
  'html, body': {
    margin: 0,
    padding: 0,
    fontWeight: 500,
    fontFeatureSettings: `'palt' 1`,
  },
});

render(
  // <Basic />,
  // <Redirects />,
  // <CustomLink />,
  // <PreventingTransitions />,
  // <NoMatchApp />,
  // <SidebarApp />,
  // <QueryParams />,
  // <ReduxBasicApp />,
  // <MobxBasicApp />,
  // <MobxHooksApp />,
  // <HistoryAPI />,
  <RoutingProviderApp />,
  document.getElementById('app'),
);
