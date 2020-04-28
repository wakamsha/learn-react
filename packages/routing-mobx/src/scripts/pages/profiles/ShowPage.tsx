import { ProfileStore } from '../../stores/ProfileStore';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';

type Props = {
  store: ProfileStore;
};

export const ProfileShowPage = observer(({ store }: Props) => {
  const handleReset = useCallback(() => store.setName(''), []);

  return (
    <>
      <h2>Show Profile</h2>
      <p>name: {store.name}</p>
      <button onClick={handleReset}>Reset</button>
    </>
  );
});
