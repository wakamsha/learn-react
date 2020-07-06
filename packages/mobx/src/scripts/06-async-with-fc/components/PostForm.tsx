import { UsersStore } from '../stores/UsersStore';
import { useContext } from '../hooks/useContext';
import { useTransaction } from '../hooks/useTransaction';
import React, { ChangeEvent, useCallback, useReducer } from 'react';

type State = {
  name: string;
  job: string;
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

export const PostForm = () => {
  const store = useContext(UsersStore.Context);

  const [{ name, job }, dispatch] = useReducer(reducer, { name: store.name, job: store.job });

  const { onSubmit, submitStatus } = useSubmit();

  const handleChangeName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'name', payload: { name: value } });

  const handleChangeJob = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) =>
    dispatch({ type: 'job', payload: { job: value } });

  const handleSubmit = async () => onSubmit({ name, job });

  const validInputs = !!name && !!job;

  const fetching = !!submitStatus.running;

  return (
    <form onSubmit={e => e.preventDefault()}>
      <h3>POST</h3>
      <p>
        <input placeholder="Name ..." value={name} onChange={handleChangeName} disabled={fetching} />
      </p>
      <p>
        <textarea placeholder="Job ..." value={job} onChange={handleChangeJob} disabled={fetching} />
      </p>
      <p>
        <button onClick={handleSubmit} disabled={!validInputs || fetching}>
          POST
        </button>
      </p>
    </form>
  );
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload.name };
    case 'job':
      return { ...state, job: action.payload.job };
    default:
      return state;
  }
};

function useSubmit() {
  const store = useContext(UsersStore.Context);

  const { handler: onSubmit, status: submitStatus } = useTransaction(
    useCallback(
      async ({ name, job }: State) => {
        store.setName(name);
        store.setJob(job);

        await store.postUser();
      },
      [store],
    ),
  );

  return { onSubmit, submitStatus };
}
