import { applyGlobalStyle } from '@learn-react/core/helpers/Style';
import { render } from 'react-dom';
import { RoutingProviderApp } from './32-routing-provider';

applyGlobalStyle();

render(
  // <Basic />,
  // <Redirects />,
  // <CustomLink />,
  // <PreventingTransitions />,
  // <NoMatchApp />,
  // <SidebarApp />,
  // <QueryParams />,
  // <MobxBasicApp />,
  // <MobxHooksApp />,
  // <HistoryAPIApp />,
  <RoutingProviderApp />,
  document.getElementById('app'),
);
