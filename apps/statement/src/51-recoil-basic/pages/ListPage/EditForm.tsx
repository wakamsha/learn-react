import { useReducer, type ChangeEvent } from 'react';
import { useSetRecoilState, type UnwrapRecoilValue } from 'recoil';
import { listState } from './states/listState';

export const EditForm = () => {
  console.info('edit form');

  const setListState = useSetRecoilState(listState);

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
    setListState((list) => list.map((item, i) => (i === index ? { ...item, name } : item)));
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
} & Pick<UnwrapRecoilValue<typeof listState>[number], 'name'>;

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
