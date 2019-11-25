import { FilterType } from './reducers';

export type FilterAction = {
  type: 'SET_FILTER';
  payload: {
    filter: FilterType;
  };
};

// Action Creators
// ----------------

export function setFilter(filter: FilterType): FilterAction {
  return {
    type: 'SET_FILTER',
    payload: {
      filter,
    },
  };
}
