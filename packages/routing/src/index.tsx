import { applyGlobalStyle, applyResetStyle } from '@learn-react/core/helpers/Style';
import { render } from 'react-dom';
import { NestRoutesDeep } from './02-nest-routes-deep';

applyResetStyle();

applyGlobalStyle();

render(
  // <Basic />,
  <NestRoutesDeep />,
  document.getElementById('app'),
);
