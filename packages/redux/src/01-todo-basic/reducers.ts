import { TodoAction } from './actions';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export const initialState: Todo[] = [
  {
    id: 1,
    text: 'hello',
    completed: false,
  },
];

export function todos(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          ...action.payload,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => (todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo));
    default:
      return state;
  }
}
