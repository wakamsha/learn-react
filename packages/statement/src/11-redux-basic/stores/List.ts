import produce from 'immer';

type Item = {
  name: string;
  age: number;
};

export type ListState = {
  items: Item[];
};

export type Actions =
  | {
      type: 'List.Add';
      payload: {
        item: Item;
      };
    }
  | {
      type: 'List.Update';
      payload: {
        index: number;
        item: Item;
      };
    };

export function listReducer(state = initialState, actions: Actions): ListState {
  switch (actions.type) {
    case 'List.Add':
      return {
        items: [...state.items, actions.payload.item],
      };
    case 'List.Update':
      return produce(state, draft => {
        const { index, item } = actions.payload;
        draft.items[index] = item;
      });
    default:
      return state;
  }
}

const initialState: ListState = {
  items: [
    {
      name: 'taro',
      age: 20,
    },
  ],
};
