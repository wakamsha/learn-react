import { useAtomValue, useSetAtom } from 'jotai';
import { type ChangeEvent } from 'react';
import { profileAtom } from '../../atoms/profileAtoms';

export const ProfileEditPage = () => {
  const name = useAtomValue(profileAtom);

  const setName = useSetAtom(profileAtom);

  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setName(value);
  };

  return (
    <>
      <h2>Edit Page</h2>
      <fieldset>
        <legend>name</legend>
        <input value={name} onChange={handleChange} />
      </fieldset>
      <p>name: {name}</p>
    </>
  );
};
