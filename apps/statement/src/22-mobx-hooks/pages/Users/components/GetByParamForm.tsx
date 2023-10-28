import { useTransaction } from '@learn-react/core/src/hooks/useTransaction';
import { observer } from 'mobx-react';
import { useCallback, useState, type ChangeEvent } from 'react';
import { UsersStore } from '../stores/UsersStore';

export const GetByParamForm = observer(() => {
  console.info('Get By Param Form');

  const store = UsersStore.useStore();

  const { onSubmit, submitRunning } = useSubmit();

  const [userId, setUserId] = useState(store.userId);

  const handleChangeId = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(value));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h3>Get by Params</h3>
      <p>取得する User の id を指定</p>
      <input type="number" max={100} value={userId} disabled={submitRunning} onChange={handleChangeId} />
      <p>
        ID: <code>{store.userId}</code>
      </p>
      <button disabled={submitRunning} onClick={() => onSubmit(userId)}>
        GET
      </button>
    </form>
  );
});

function useSubmit() {
  const store = UsersStore.useStore();

  const [onSubmit, submitStatus] = useTransaction(
    useCallback(
      async (userId: number) => {
        store.setUserId(userId);
        await store.getUser();
      },
      [store],
    ),
  );

  return { onSubmit, submitRunning: !!submitStatus.running };
}
