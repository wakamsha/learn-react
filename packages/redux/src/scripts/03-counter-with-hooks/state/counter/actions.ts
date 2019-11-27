export type CounterAction = IncAction | DecAction;

type IncAction = {
  type: 'INC';
  payload: {
    value: number;
  };
};

type DecAction = {
  type: 'DEC';
  payload: {
    value: number;
  };
};

// Action Creators
// ----------------

export function incCount(value: number): IncAction {
  return {
    type: 'INC',
    payload: {
      value,
    },
  };
}

export function decCount(value: number): DecAction {
  return {
    type: 'DEC',
    payload: {
      value,
    },
  };
}
