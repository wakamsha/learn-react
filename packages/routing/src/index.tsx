import { applyGlobalStyle, applyResetStyle } from '@learn-react/core/helpers/Style';
import { render } from 'react-dom';
import { WithPageTransition } from './04-with-page-transition';

applyResetStyle();

applyGlobalStyle();

render(
  // <Basic />,
  // <NestRoutesDeep />,
  // <RouteObjects />,
  <WithPageTransition />,
  document.getElementById('app'),
);
