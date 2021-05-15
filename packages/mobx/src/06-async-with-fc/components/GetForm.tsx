import { TransactionStatus } from '@learn-react/core/hooks/useTransaction';
import { useState } from 'react';
import { UsersStore } from '../stores/UsersStore';

/**
 * useTransaction を使わないパターン。
 * 非同期処理を呼び出す側で状態 ( TransactionStatus ) を全てお世話している。
 */
export const GetForm = () => {
  console.info('Get Form');

  const store = UsersStore.useStore();

  const [status, setStatus] = useState<TransactionStatus>({});

  const handleClick = async () => {
    setStatus({ running: true, error: false });

    try {
      await store.getAllUsers();
      setStatus({ running: false, error: false });
    } catch (e) {
      console.error('@transaction', e);
      setStatus({ running: false, error: true });
    }
  };

  return (
    <div>
      <h3>GET</h3>
      <p>
        <button onClick={handleClick} disabled={!!status.running}>
          GET
        </button>
      </p>
    </div>
  );
};
