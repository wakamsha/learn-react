import { observer } from 'mobx-react';
import { useCallback, type ChangeEvent } from 'react';
import { type ProfileStore } from '../../stores/ProfileStore';

type Props = {
  store: ProfileStore;
};

export const ProfileEditPage = observer(({ store }: Props) => {
  const handleChange = useCallback(
    ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => store.setName(value),
    [store],
  );

  return (
    <>
      <h2>Edit Profile</h2>
      <fieldset>
        <legend>name</legend>
        <input value={store.name} onChange={handleChange} />
      </fieldset>
      <p>name: {store.name}</p>
    </>
  );
});
