import { reducer as FilterReducer, State as FilterState } from './Filter/reducer';
import { reducer as TodoReducer, State as TodoState } from './Todo/reducer';
import { combineReducers, createStore } from 'redux';

export type RootState = {
  filter: FilterState;
  todo: TodoState;
};

export const store = createStore(combineReducers({ filter: FilterReducer, todo: TodoReducer }));
