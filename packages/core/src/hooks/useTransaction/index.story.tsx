import { useCallback, useState, type ChangeEvent } from 'react';
import { useTransaction } from '.';
import { requestGetUser, type User } from '../../api/user';

export const Story = () => {
  const [userId, setUserId] = useState(1);

  const { result, onSubmit, submitRunning } = useSubmit();

  const handleChangeUserId = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(value));
  };

  return (
    <>
      <h2>Get by Params</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <p>取得する User の id を指定</p>
        <input type="number" max={100} value={userId} disabled={submitRunning} onChange={handleChangeUserId} />
        <p>
          ID: <code>{userId}</code>
        </p>
        <button disabled={submitRunning} onClick={() => onSubmit(userId)}>
          GET
        </button>
      </form>
      <pre>
        <code>{JSON.stringify(result, null, 2)}</code>
      </pre>
    </>
  );
};

function useSubmit() {
  const [user, setUser] = useState<User>();

  const [onSubmit, submitStatus] = useTransaction(
    useCallback(async (userId: number) => {
      const user = await requestGetUser({ path: userId.toString() });

      setUser(user);
    }, []),
  );

  return { result: user, onSubmit, submitRunning: !!submitStatus.running };
}
