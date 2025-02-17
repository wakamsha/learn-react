import { configure } from 'mobx';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

export const MobxHooksApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
});
