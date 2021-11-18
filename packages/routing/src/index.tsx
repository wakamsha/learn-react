import { applyGlobalStyle, applyResetStyle } from '@learn-react/core/helpers/Style';
import { render } from 'react-dom';
import { Basic } from './01-basic';

applyResetStyle();

applyGlobalStyle();

render(
  <Basic />,
  // <NestRoutesDeep />,
  // <RouteObjects />,
  // <WithPageTransition />,
  document.getElementById('app'),
);
