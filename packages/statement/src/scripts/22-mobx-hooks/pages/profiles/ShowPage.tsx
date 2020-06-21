import { ProfileStore } from '../../stores/ProfileStore';
import { useContext } from '../../../@core/hooks/useContext';
import React from 'react';

/**
 * React 標準の ContextAPI からストアを prop で受け取り、
 * useObserver をそのまま使用するパターン
 */
// export const ProfileShowPage = ({ store }: { store: ProfileStore }) => {
//   const { name } = useObserver(() => ({ name: store.name }));

//   const handleReset = () => store.setName('');

//   return (
//     <>
//       <h2>Show Profile</h2>
//       <p>name: {name}</p>
//       <button onClick={handleReset}>Reset</button>
//     </>
//   );
// };

/**
 * グローバルストアとカスタムフックを組み合わせて使用するパターン。
 */
export const ProfileShowPage = () => {
  const store = useContext(ProfileStore.Context);

  const name = ProfileStore.useStore(() => store.name);

  const handleReset = () => store.setName('');

  return (
    <>
      <h2>Show Profile</h2>
      <p>name: {name}</p>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};
