import { combineReducers, createStore } from 'redux';
import { FilterType, filter } from './filters/reducers';
import { Todo, todos } from './todos/reducers';

export type AppState = {
  todos: Todo[];
  filter: FilterType;
};

const reducers = combineReducers<AppState>({ todos, filter });

export const store = createStore(reducers);
