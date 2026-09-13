import { css } from '@emotion/css';
import { requestGetUser, type User } from '@learn-react/core/src/api/user';
import { type ChangeEvent, useActionState, useState } from 'react';

type State = {
  status: 'idle' | 'success' | 'error';
  user?: User;
};

/**
 * `useActionState` を使ったサンプル。
 *
 * `useReducer` の要領で状態を管理しつつ、非同期処理を扱うことが可能です。
 *
 * @see {@link https://ja.react.dev/reference/react/useActionState useActionState}
 */
export const Story = () => {
  const [userId, setUserId] = useState(1);

  const [state, formAction, isPending] = useActionState(fetchUser, {
    status: 'idle',
  });

  const handleChangeUserId = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(value));
  };

  return (
    <>
      <h2>Get by Params</h2>

      <form action={formAction}>
        <p>取得する User の id を指定</p>
        <input
          type="number"
          name="userId"
          max={100}
          value={userId}
          disabled={isPending}
          onChange={handleChangeUserId}
        />
        <p>
          ID: <code>{userId}</code>
        </p>
        <button className={styleButton} disabled={isPending}>
          GET
        </button>
      </form>

      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </>
  );
};

async function fetchUser(_state: State, formData: FormData): Promise<State> {
  const userId = formData.get('userId');

  if (!userId) {
    return {
      status: 'error',
    };
  }

  try {
    const user = await requestGetUser({ path: userId as string });
    return {
      status: 'success',
      user,
    };
  } catch {
    return {
      status: 'error',
    };
  }
}

const styleButton = css`
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;
