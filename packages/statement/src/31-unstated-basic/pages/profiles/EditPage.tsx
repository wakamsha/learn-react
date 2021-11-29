import type { ChangeEvent } from 'react';
import { ProfileContainer } from '../../containers/ProfileContainer';

export const ProfileEditPage = () => {
  const { name, setName } = ProfileContainer.useContainer();

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
