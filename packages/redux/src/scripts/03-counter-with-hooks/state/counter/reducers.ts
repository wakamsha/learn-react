import { CounterAction } from './actions';

export function counter(state = 0, action: CounterAction): number {
  switch (action.type) {
    case 'INC':
      return state + action.payload.value;
    case 'DEC':
      return state - action.payload.value;
    default:
      return state;
  }
}
