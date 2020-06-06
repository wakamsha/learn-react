type FilterType = 'ALL' | 'COMPLETED' | 'INCOMPLETE';

export type State = FilterType;

export type Actions = {
  type: 'Filter.set';
  payload: {
    filter: FilterType;
  };
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case 'Filter.set':
      return action.payload.filter;
    default:
      return state;
  }
}

const initialState: State = 'ALL';
