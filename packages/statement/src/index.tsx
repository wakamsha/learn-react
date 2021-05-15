import { applyGlobalStyle } from '@learn-react/core/helpers/Style';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { UnstatedBasicApp } from './31-unstated-basic';

applyGlobalStyle();

render(
  <StrictMode>
    {/* <MobxBasicApp /> */}
    {/* <MobxHooksApp /> */}
    <UnstatedBasicApp />
    {/* <ConstateBasicApp /> */}
  </StrictMode>,
  document.getElementById('app'),
);
