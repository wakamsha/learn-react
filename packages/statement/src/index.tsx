import { applyGlobalStyle } from '@learn-react/core/helpers/Style';
import { StrictMode } from 'react';
import { render } from 'react-dom';
// import { MobxBasicApp } from './21-mobx-basic';
// import { MobxHooksApp } from './22-mobx-hooks';
import { UnstatedBasicApp } from './31-unstated-basic';

applyGlobalStyle();

render(
  <StrictMode>
    {/* <MobxBasicApp /> */}
    {/* <MobxHooksApp /> */}
    <UnstatedBasicApp />
  </StrictMode>,
  document.getElementById('app'),
);
