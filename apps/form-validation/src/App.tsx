import { type CSSProperties, type FC, useActionState } from 'react';
import { type CreateUserResponse, requestPostUser } from './api/user';

type State = {
  status: 'idle' | 'pending' | 'success' | 'error';
  user?: CreateUserResponse;
};

export const App: FC = () => {
  const [state, formAction, isPending] = useActionState(postUser, {
    status: 'idle',
  });

  return (
    <main>
      <form style={styleForm} action={formAction}>
        <label style={styleFormItem}>
          Name:
          <input name="name" />
        </label>

        <label style={styleFormItem}>
          Email:
          <input type="email" name="email" />
        </label>

        <label style={styleFormItem}>
          Job:
          <textarea name="job" placeholder="Job..." />
        </label>

        <button disabled={isPending}>POST</button>
      </form>

      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </main>
  );
};

async function postUser(_state: State, formData: FormData): Promise<State> {
  const name = formData.get('name');
  const email = formData.get('email');
  const job = formData.get('job');

  if (!name || !email || !job) {
    return {
      status: 'error',
    };
  }

  try {
    const response = await requestPostUser({
      send: {
        name: name as string,
        job: job as string,
      },
    });
    return {
      status: 'success',
      user: response,
    };
  } catch {
    return {
      status: 'error',
    };
  }
}

const styleForm: CSSProperties = {
  display: 'grid',
  gap: 16,
  maxWidth: 400,
};

const styleFormItem: CSSProperties = {
  display: 'grid',
  gap: 4,
};
