import { useReducer, type ChangeEvent } from 'react';
import { useSetRecoilState, type UnwrapRecoilValue } from 'recoil';
import { listState } from './states/listState';

export const AddForm = () => {
  console.info('add form');

  const setListState = useSetRecoilState(listState);

  const [{ name, age }, dispatch] = useReducer(reducer, {
    name: '',
    age: 18,
  });

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'name',
      payload: e.currentTarget.value,
    });
  };

  const handleInputAge = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'age',
      payload: Number(e.currentTarget.value),
    });
  };

  const handleSubmit = () => {
    setListState((list) => [...list, { name, age }]);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>Add</legend>
        <p>
          <label>
            name:
            <input value={name} onChange={handleInputName} />
          </label>
        </p>
        <p>
          <label>
            age:
            <input type="number" value={age} onChange={handleInputAge} />
          </label>
        </p>
        <button onClick={handleSubmit}>Add</button>
      </fieldset>
    </form>
  );
};

type State = UnwrapRecoilValue<typeof listState>[number];

type Action =
  | {
      type: 'name';
      payload: State['name'];
    }
  | {
      type: 'age';
      payload: State['age'];
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'name':
    case 'age':
      return {
        ...state,
        [action.type]: action.payload,
      };
    default:
      return state;
  }
}
