import { useReducer, type ChangeEvent } from 'react';

type State = {
  name: string;
  job: string;
};

export const PostForm = () => {
  console.info('Post Form');

  const [{ name, job }, dispatch] = useReducer(reducer, { name: '', job: '' });

  const handleChangeName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'name', payload: { name: value } });
  };

  const handleChangeJob = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'job', payload: { job: value } });
  };

  const handleSubmit = () => {
    console.info({ name, job });
  };

  const validInputs = !!name && !!job;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h3>POST</h3>
      <p>
        <input placeholder="Name ..." value={name} onChange={handleChangeName} />
      </p>
      <p>
        <textarea placeholder="Job ..." value={job} onChange={handleChangeJob} />
      </p>
      <p>
        <button disabled={!validInputs} onClick={handleSubmit}>
          POST
        </button>
      </p>
    </form>
  );
};

type Action =
  | {
      type: 'name';
      payload: Pick<State, 'name'>;
    }
  | {
      type: 'job';
      payload: Pick<State, 'job'>;
    };

const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case 'name':
      return { ...state, name: payload.name };
    case 'job':
      return { ...state, job: payload.job };
    default:
      return state;
  }
};
