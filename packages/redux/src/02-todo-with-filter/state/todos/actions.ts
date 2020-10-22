export type TodoAction = AddAction | ToggleAction;

export type AddAction = {
  type: 'ADD_TODO';
  payload: {
    id: number;
    text: string;
  };
};

export type ToggleAction = {
  type: 'TOGGLE_TODO';
  payload: {
    id: number;
  };
};

// Action Creators
// ----------------

export function addTodo(text: string): AddAction {
  return {
    type: 'ADD_TODO',
    payload: {
      text,
      id: Date.now(),
    },
  };
}

export function toggleTodo(id: number): ToggleAction {
  return {
    type: 'TOGGLE_TODO',
    payload: {
      id,
    },
  };
}
