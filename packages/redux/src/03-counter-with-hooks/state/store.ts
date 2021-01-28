import { createStore } from 'redux';
import { counter } from './counter/reducers';

export const store = createStore(counter);
