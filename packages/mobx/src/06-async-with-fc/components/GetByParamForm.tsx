import { UsersStore } from '../stores/UsersStore';
import { useContext } from '@learn-react/core/hooks/useContext';
import { useObserver } from 'mobx-react';
import { useTransaction } from '@learn-react/core/hooks/useTransaction';
import React, { ChangeEvent, useState } from 'react';

export const GetByParamForm = () => {
  const store = useContext(UsersStore.Context);

  const { id } = useObserver(() => ({ id: store.userId }));

  const { onSubmit, submitRunning } = useSubmit();

  const [userId, setUserId] = useState(store.userId);

  const handleChangeId = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setUserId(Number(value));

  return (
    <form onSubmit={e => e.preventDefault()}>
      <h3>Get by Params</h3>
      <p>取得する User の id を指定</p>
      <input type="number" max={100} disabled={submitRunning} onChange={handleChangeId} />
      <p>
        ID: <code>{id}</code>
      </p>
      <button onClick={() => onSubmit(userId)} disabled={submitRunning}>
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

  const [onSubmit, submitStatus] = useTransaction(async (userId: number) => {
    store.setUserId(userId);
    await store.getUser();
  });

  return { onSubmit, submitRunning: !!submitStatus.running };
}
