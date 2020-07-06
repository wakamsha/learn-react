import { UsersStore } from '../stores/UsersStore';
import { useContext } from '../hooks/useContext';
import { useObserver } from 'mobx-react';
import { useTransaction } from '../hooks/useTransaction';
import React, { ChangeEvent, useCallback, useState } from 'react';

export const GetByParamForm = () => {
  const store = useContext(UsersStore.Context);

  const { id } = useObserver(() => ({ id: store.userId }));

  const { onSubmit, submitStatus } = useSubmit();

  const [userId, setUserId] = useState(store.userId);

  const handleChangeId = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setUserId(Number(value));

  return (
    <form onSubmit={e => e.preventDefault()}>
      <h3>Get by Params</h3>
      <p>取得する User の id を指定</p>
      <input type="number" max={100} disabled={!!submitStatus.running} onChange={handleChangeId} />
      <p>
        ID: <code>{id}</code>
      </p>
      <button onClick={() => onSubmit(userId)} disabled={!!submitStatus.running}>
        GET
      </button>
    </form>
  );
};

/**
 * useTransaction を使ったパターン。
 * Transaction ひとつごとにカスタムフック化するのが望ましい。
 * CC における transaction メソッドひとつにつきカスタムフックを一つ定義するイメージ。
 */
function useSubmit() {
  const store = useContext(UsersStore.Context);

  const { handler: onSubmit, status: submitStatus } = useTransaction(
    useCallback(
      async (userId: number) => {
        store.setUserId(userId);
        await store.getUser();
      },
      [store],
    ),
  );

  return { onSubmit, submitStatus };
}
