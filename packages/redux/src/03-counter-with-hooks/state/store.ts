import { counter } from './counter/reducers';
import { createStore } from 'redux';

export const store = createStore(counter);
