import { combineReducers, createStore } from 'redux';
import { ListState, listReducer } from './List';
import { ProfileState, profileReducer } from './Profile';

// declare module 'react-redux' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultRootState extends RootState {}
// }

export type RootState = {
  profile: ProfileState;
  list: ListState;
};

export const store = createStore(
  combineReducers({
    profile: profileReducer,
    list: listReducer,
  }),
);
