import type { ChangeEvent } from 'react';
import { useEditName, useName } from '../../containers/ProfileContainer';

export const ProfileEditPage = () => {
  const name = useName();
  const setName = useEditName();

  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setName(value);
  };

  return (
    <>
      <h2>Edit Page</h2>
      <fieldset>
        <legend>name</legend>
        <input onChange={handleChange} value={name} />
      </fieldset>
      <p>name: {name}</p>
    </>
  );
};
