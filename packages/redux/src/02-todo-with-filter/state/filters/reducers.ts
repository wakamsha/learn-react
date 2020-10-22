import { FilterAction } from './actions';

export type FilterType = 'ALL' | 'COMPLETED' | 'INCOMPLETE';

export function filter(state: FilterType = 'ALL', action: FilterAction): FilterType {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload.filter;
    default:
      return state;
  }
}
