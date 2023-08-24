import { useReducer, type ChangeEvent } from 'react';
import { useUpdateList } from '../states/ListState';

export const AddForm = () => {
  console.info('add form');

  const { add } = useUpdateList();

  const [{ name, age }, dispatch] = useReducer(reducer, {
    name: '',
    age: 18,
  });

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'name',
      payload: e.target.value,
    });
  };

  const handleInputAge = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'age',
      payload: Number(e.target.value),
    });
  };

  const handleSubmit = () => {
    add({ name, age });
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

type State = Parameters<ReturnType<typeof useUpdateList>['add']>[0];

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
