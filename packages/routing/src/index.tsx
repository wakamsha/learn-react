import { applyGlobalStyle, applyResetStyle } from '@learn-react/core/helpers/Style';
import { render } from 'react-dom';
import { Basic } from './01-basic/Basic';

applyResetStyle();

applyGlobalStyle();

render(
  <Basic />,
  // <Redirects />,
  // <CustomLink />,
  // <PreventingTransitions />,
  // <NoMatchApp />,
  // <SidebarApp />,
  // <QueryParams />,
  // <MobxBasicApp />,
  // <MobxHooksApp />,
  // <HistoryAPIApp />,
  // <RoutingProviderApp />,
  document.getElementById('app'),
);
