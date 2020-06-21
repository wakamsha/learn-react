export type ProfileState = {
  name: string;
};

export type Actions = {
  type: 'Profile.Updates.Name';
  payload: {
    name: string;
  };
};

export function profileReducer(state = initialState, actions: Actions): ProfileState {
  switch (actions.type) {
    case 'Profile.Updates.Name':
      return {
        name: actions.payload.name,
      };
    default:
      return state;
  }
}

const initialState: ProfileState = {
  name: '',
};
