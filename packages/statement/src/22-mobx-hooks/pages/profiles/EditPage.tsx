import { useContext } from '@learn-react/core/hooks/useContext';
import { useObserver } from 'mobx-react';
import { ChangeEvent } from 'react';
import { ProfileStore } from '../../stores/ProfileStore';

/**
 * React 標準の ContextAPI からストアを prop で受け取り、
 * useObserver をそのまま使用するパターン
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
 * グローバルストアと同様にカスタムフックを使用するパターン
 */
export const ProfileEditPage = () => {
  const store = useContext(ProfileStore.Context);

  const { name } = useObserver(() => ({ name: store.name }));

  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => store.setName(value);

  return (
    <>
      <h2>Edit Profile</h2>
      <fieldset>
        <legend>name</legend>
        <input onChange={handleChange} value={name} />
      </fieldset>
      <p>name: {name}</p>
    </>
  );
};
