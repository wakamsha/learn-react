import * as React from 'react';
import { Counter as CounterComponent } from './views/components/Counter';
import { Display } from './views/components/Display';
import { Provider } from 'react-redux';
import { store } from './state/store';

export const Counter = () => (
  <Provider store={store}>
    <Display />
    <CounterComponent />
  </Provider>
);
