import { Counter as CounterComponent } from './views/components/Counter';
import { Display } from './views/components/Display';
import { Provider } from 'react-redux';
import { store } from './state/store';
import React from 'react';

export const Counter = () => (
  <Provider store={store}>
    <Display />
    <CounterComponent />
  </Provider>
);
