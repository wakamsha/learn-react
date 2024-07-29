import { useContext } from '@learn-react/core/src/hooks/useContext';
import { useTransaction } from '@learn-react/core/src/hooks/useTransaction';
import { useReducer, type ChangeEvent } from 'react';
import { UsersStore } from '../stores/UsersStore';

type State = {
  name: string;
  job: string;
};

export const PostForm = () => {
  console.info('Post Form');

  const store = UsersStore.useStore();

  const [{ name, job }, dispatch] = useReducer(reducer, { name: store.name, job: store.job });

  const { onSubmit, fetching } = useSubmit();

  const handleChangeName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'name', payload: { name: value } });
  };

  const handleChangeJob = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'job', payload: { job: value } });
  };

  const handleSubmit = async () => {
    await onSubmit({ name, job });
  };

  const validInputs = !!name && !!job;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <h3>POST</h3>
      <p>
        <input placeholder="Name ..." value={name} disabled={fetching} onChange={handleChangeName} />
      </p>
      <p>
        <textarea placeholder="Job ..." value={job} disabled={fetching} onChange={handleChangeJob} />
      </p>
      <p>
        <button disabled={!validInputs || fetching} onClick={handleSubmit}>
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

  const [onSubmit, submitStatus] = useTransaction(
    async ({ name, job }: State) => {
      store.setName(name);
      store.setJob(job);

      await store.postUser();
    },
    (error) => {
      console.error('😓😓😓', error.message);
    },
  );

  return { onSubmit, fetching: !!submitStatus.running };
}
