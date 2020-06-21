import { MobxHooksApp } from './22-mobx-hooks';
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
  // <ReduxBasicApp />,
  <MobxHooksApp />,
  document.getElementById('app'),
);
