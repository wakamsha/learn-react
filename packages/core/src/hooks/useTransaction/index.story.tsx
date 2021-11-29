import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';
import { useTransaction } from '.';
import { request } from '../../helpers/Api';

export const Story = () => {
  const [userId, setUserId] = useState(1);

  const { result, onSubmit, submitRunning } = useSubmit();

  const handleChangeUserId = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(value));
  };

  return (
    <>
      <h2>Get by Params</h2>
      <form onSubmit={e => e.preventDefault()}>
        <p>取得する User の id を指定</p>
        <input type="number" max={100} value={userId} disabled={submitRunning} onChange={handleChangeUserId} />
        <p>
          ID: <code>{userId}</code>
        </p>
        <button onClick={() => onSubmit(userId)} disabled={submitRunning}>
          GET
        </button>
      </form>
      <pre>
        <code>{JSON.stringify(result, null, 2)}</code>
      </pre>
    </>
  );
};

type User = {
  id: number;
  name: string;
  username?: string;
  email?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  job?: string;
};

function useSubmit() {
  const [user, setUser] = useState<User>();

  const [onSubmit, submitStatus] = useTransaction(
    useCallback(async (userId: number) => {
      const user = await request<{}, User>({
        method: 'GET',
        path: `/users/${userId}`,
        ...{
          withCredentials: false,
        },
      });

      setUser(user);
    }, []),
  );

  return { result: user, onSubmit, submitRunning: !!submitStatus.running };
}
