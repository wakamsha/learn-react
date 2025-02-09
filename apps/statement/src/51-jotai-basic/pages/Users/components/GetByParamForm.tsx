import { useTransaction } from '@learn-react/core/src/hooks/useTransaction';
import { useAtom } from 'jotai';
import { useCallback, useState, type ChangeEvent } from 'react';
import { getUserAtom } from '../../../atoms/usersAtom';

export const GetByParamForm = () => {
  console.info('Get By Param Form');

  const { onSubmit, submitRunning } = useSubmit();

  const [userId, setUserId] = useState(0);

  const handleChangeId = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(value));
  };

  const handleSubmit = async () => {
    await onSubmit(userId);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <h3>Get by Params</h3>
      <p>取得する User の id を指定</p>
      <input type="number" max={100} value={userId} disabled={submitRunning} onChange={handleChangeId} />
      <p>
        ID: <code>{userId}</code>
      </p>
      <button disabled={submitRunning} onClick={handleSubmit}>
        GET
      </button>
    </form>
  );
};

function useSubmit() {
  const [, getUser] = useAtom(getUserAtom);

  const [onSubmit, submitStatus] = useTransaction(
    useCallback(
      async (userId: number) => {
        await getUser(userId);
      },
      [getUser],
    ),
  );

  return { onSubmit, submitRunning: !!submitStatus.running };
}
