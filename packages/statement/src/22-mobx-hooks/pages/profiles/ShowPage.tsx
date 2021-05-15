import { observer } from 'mobx-react';
import { ProfileStore } from '../../stores/ProfileStore';

/**
 * React 標準の ContextAPI からストアを prop で受け取り、useObserver をそのまま使用するパターン。
 *
 * @remarks
 * `useObserver` は deprecated となったため、もう使えない。
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
export const ProfileShowPage = observer(() => {
  const store = ProfileStore.useStore();

  const handleReset = () => {
    store.setName('');
  };

  return (
    <>
      <h2>Show Profile</h2>
      <p>name: {store.name}</p>
      <button onClick={handleReset}>Reset</button>
    </>
  );
});
