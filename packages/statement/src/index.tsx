import { UnstatedBasicApp } from './31-unstated-basic';
import { applyGlobalStyle } from '@learn-react/core/helpers/Style';
import { render } from 'react-dom';
import React, { StrictMode } from 'react';

applyGlobalStyle();

render(
  <StrictMode>
    <UnstatedBasicApp />
  </StrictMode>,
  document.getElementById('app'),
);
