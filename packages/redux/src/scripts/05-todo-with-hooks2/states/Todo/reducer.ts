import produce from 'immer';

export type State = {
  id: number;
  text: string;
  completed: boolean;
}[];

export type Actions =
  | {
      type: 'Todo.add';
      payload: {
        id: number;
        text: string;
      };
    }
  | {
      type: 'Todo.toggle';
      payload: {
        id: number;
      };
    };

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case 'Todo.add':
      return produce(state, draft => {
        draft.push({
          ...action.payload,
          completed: false,
        });
      });
    case 'Todo.toggle':
      return state.map(todo => (todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo));
    default:
      return state;
  }
}

const initialState: State = [
  {
    id: 1,
    text: 'hello',
    completed: false,
  },
  {
    id: 2,
    text: 'world',
    completed: true,
  },
];
