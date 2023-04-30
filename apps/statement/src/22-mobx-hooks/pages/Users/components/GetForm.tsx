import { useTransaction } from '@learn-react/core/src/hooks/useTransaction';
import { useCallback } from 'react';
import { UsersStore } from '../stores/UsersStore';

export const GetForm = () => {
  console.info('Get Form');

  const { load, loadStatus } = useLoad();

  return (
    <div>
      <h3>Get</h3>
      <button onClick={load} disabled={!!loadStatus.running}>
        GET ALL USERS
      </button>
    </div>
  );
};

function useLoad() {
  const store = UsersStore.useStore();

  const [load, loadStatus] = useTransaction(
    useCallback(async () => {
      await store.getAllUsers();
    }, [store]),
  );

  return { load, loadStatus };
}
