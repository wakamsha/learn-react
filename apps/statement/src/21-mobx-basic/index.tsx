import { observer } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

export const MobxBasicApp = observer(() => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
