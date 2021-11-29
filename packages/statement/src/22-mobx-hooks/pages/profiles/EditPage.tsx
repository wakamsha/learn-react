import { observer } from 'mobx-react';
import type { ChangeEvent } from 'react';
import { ProfileStore } from '../../stores/ProfileStore';

/**
 * React 標準の ContextAPI からストアを prop で受け取り、useObserver をそのまま使用するパターン。
 *
 * @remarks
 * `useObserver` は deprecated となったため、もう使えない。
 */
// export const ProfileEditPage = ({ store }: { store: ProfileStore }) => {
//   const { name } = useObserver(() => ({ name: store.name }));

//   const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => store.setName(value);

//   return (
//     <>
//       <h2>Edit Profile</h2>
//       <fieldset>
//         <legend>name</legend>
//         <input onChange={handleChange} value={name} />
//       </fieldset>
//       <p>name: {name}</p>
//     </>
//   );
// };

/**
 * グローバルストアとカスタムフックを組み合わせて使用するパターン。
 */
export const ProfileEditPage = observer(() => {
  const store = ProfileStore.useStore();

  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    store.setName(value);
  };

  return (
    <>
      <h2>Edit Profile</h2>
      <fieldset>
        <legend>name</legend>
        <input onChange={handleChange} value={store.name} />
      </fieldset>
      <p>name: {store.name}</p>
    </>
  );
});
