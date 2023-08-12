import { useReducer, type ChangeEvent } from 'react';
import { useUpdateList } from '../states/ListState';

export const EditForm = () => {
  console.info('edit form');

  const { edit } = useUpdateList();

  const [{ index, name }, dispatch] = useReducer(reducer, {
    index: 0,
    name: '',
  });

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'name',
      payload: e.target.value,
    });
  };

  const handleInputIndex = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'index',
      payload: Number(e.currentTarget.value),
    });
  };

  const handleSubmit = () => {
    edit(name, index);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>Edit</legend>
        <p>
          <label>
            index:
            <input type="number" value={index} onChange={handleInputIndex} />
          </label>
        </p>
        <p>
          <label>
            name:
            <input value={name} onChange={handleInputName} />
          </label>
        </p>
        <button onClick={handleSubmit}>Edit</button>
      </fieldset>
    </form>
  );
};

type State = {
  index: number;
  name: Parameters<ReturnType<typeof useUpdateList>['edit']>[0];
};

type Action =
  | {
      type: 'index';
      payload: number;
    }
  | {
      type: 'name';
      payload: string;
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'index':
    case 'name':
      return {
        ...state,
        [action.type]: action.payload,
      };
    default:
      return state;
  }
}
