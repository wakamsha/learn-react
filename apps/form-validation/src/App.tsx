import { type CSSProperties, type FC, useActionState } from 'react';
import { z } from 'zod';
import { type CreateUserResponse, requestPostUser } from './api/user';

type ErrorSchema = {
  name?: string;
  email?: string;
  job?: string;
};

type FormValues = {
  name?: string;
  email?: string;
  job?: string;
};

type State =
  | {
      status: 'idle';
    }
  | {
      status: 'pending';
    }
  | {
      status: 'success';
      user: CreateUserResponse;
    }
  | {
      status: 'error';
      errors?: ErrorSchema;
      values?: FormValues;
    };

/**
 * React の標準機能と Zod を活用したフォームバリデーションのデモ。
 *
 * useActionState を使用することで、フォームの状態管理と非同期処理を簡単に実装することができる。
 *
 * また、Zod を使用してフォームの入力値をバリデーションすることで、ユーザーが入力した値が正しい形式であることを保証することができる。
 *
 * このように、React の標準機能と Zod を活用することで、シンプルかつ効率的なフォームバリデーションを実装することができる。
 */
export const App: FC = () => {
  const [state, formAction, isPending] = useActionState(postUser, {
    status: 'idle',
  });

  const values = state.status === 'error' ? state.values : undefined;

  return (
    <main>
      <form style={styleForm} action={formAction}>
        <div style={styleFormItem}>
          <label style={styleFormLabel}>
            Name:
            <input name="name" defaultValue={values?.name} />
          </label>
          {state.status === 'error' && state.errors?.name ? <p style={styleErrorMessage}>{state.errors.name}</p> : null}
        </div>

        <div style={styleFormItem}>
          <label style={styleFormLabel}>
            Email:
            <input type="email" name="email" defaultValue={values?.email} />
          </label>
          {state.status === 'error' && state.errors?.email ? (
            <p style={styleErrorMessage}>{state.errors.email}</p>
          ) : null}
        </div>

        <div style={styleFormItem}>
          <label style={styleFormLabel}>
            Job:
            <textarea name="job" placeholder="Job..." defaultValue={values?.job} />
          </label>
          {state.status === 'error' && state.errors?.job ? <p style={styleErrorMessage}>{state.errors.job}</p> : null}
        </div>

        <button disabled={isPending}>POST</button>
      </form>

      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </main>
  );
};

const postSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  job: z.string().min(1, 'Job is required'),
});

async function postUser(_state: State, formData: FormData): Promise<State> {
  const input = Object.fromEntries(formData);

  const result = postSchema.safeParse(input);

  if (!result.success) {
    const errors: ErrorSchema = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof ErrorSchema;
      errors[key] = issue.message;
    }

    return {
      status: 'error',
      errors,
      values: {
        name: String(input.name ?? ''),
        email: String(input.email ?? ''),
        job: String(input.job ?? ''),
      },
    };
  }

  try {
    const response = await requestPostUser({
      send: {
        name: result.data.name,
        // email: result.data.email,
        job: result.data.job,
      },
    });
    return {
      status: 'success',
      user: response,
    };
  } catch {
    return {
      status: 'error',
      values: {
        name: result.data.name,
        email: result.data.email,
        job: result.data.job,
      },
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

const styleFormLabel: CSSProperties = {
  display: 'grid',
  gap: 4,
};

const styleErrorMessage: CSSProperties = {
  fontSize: '0.75rem',
  margin: 0,
  color: 'red',
};
