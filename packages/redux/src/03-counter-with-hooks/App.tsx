import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { Counter as CounterComponent } from './views/components/Counter';
import { Display } from './views/components/Display';

export const Counter = () => (
  <Provider store={store}>
    <Display />
    <CounterComponent />
  </Provider>
);
