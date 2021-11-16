import { applyGlobalStyle, applyResetStyle } from '@learn-react/core/helpers/Style';
import { render } from 'react-dom';
import { RouteObjects } from './03-route-objects';

applyResetStyle();

applyGlobalStyle();

render(
  // <Basic />,
  // <NestRoutesDeep />,
  <RouteObjects />,
  document.getElementById('app'),
);
