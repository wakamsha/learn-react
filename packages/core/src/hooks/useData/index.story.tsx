import { css } from '@linaria/core';
import { Suspense, useState, useTransition, type ChangeEvent } from 'react';
import { useData } from '.';
import { ErrorBoundary, type FallbackProps } from '../../components/utils/ErrorBoundary';
import { request, type ErrorResult } from '../../helpers/Api';
import { cssVar } from '../../helpers/Style';

export const Story = () => {
  const [userId, setUserId] = useState(1);

  const [isPending, startTransition] = useTransition();

  const handleChangeUserId = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setUserId(Number(value));
    });
  };

  const handleReset = () => {
    startTransition(() => {
      setUserId(1);
    });
  };

  return (
    <>
      <h2>Get by Params</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <p>取得する User の id を指定</p>
        <input type="number" max={100} value={userId} disabled={isPending} onChange={handleChangeUserId} />
        {isPending ? <span className={styleIndicator}>Loading...</span> : null}
        <p>
          ID: <code>{userId}</code>
        </p>
      </form>

      <ErrorBoundary fallbackComponent={ErrorFallback} onReset={handleReset}>
        <Suspense fallback={<p>Loading...</p>}>
          <Presentation userId={userId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

const styleIndicator = css`
  font-weight: bold;
  color: ${cssVar('ThemeDangerNeutral')};
`;

const Presentation = ({ userId }: { userId: number }) => {
  const result = useData(['user', userId], fetchUser);

  return (
    <pre>
      <code>{JSON.stringify(result, null, 2)}</code>
    </pre>
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

function fetchUser(userId: number) {
  return request<Record<string, unknown>, User>({
    method: 'GET',
    path: `/users/${userId}`,
    ...{
      withCredentials: false,
    },
  });
}

const ErrorFallback = ({ error, onReset }: FallbackProps<ErrorResult>) => (
  <div>
    <pre>
      <code>{JSON.stringify(error, null, 2)}</code>
    </pre>
    <button onClick={onReset}>リトライ</button>
  </div>
);
