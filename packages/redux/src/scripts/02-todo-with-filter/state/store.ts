import { combineReducers, createStore } from 'redux';
import { filter } from './filters/reducers';
import { todos } from './todos/reducers';

const reducers = combineReducers({ todos, filter });

export const store = createStore(reducers);
