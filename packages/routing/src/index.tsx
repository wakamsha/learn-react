import { applyGlobalStyle, applyResetStyle } from '@learn-react/core/helpers/Style';
import { createRoot } from 'react-dom/client';
import { WithPageTransition } from './04-with-page-transition';

applyResetStyle();

applyGlobalStyle();

const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(
  // <Basic />,
  // <NestRoutesDeep />,
  // <RouteObjects />,
  <WithPageTransition />,
);
