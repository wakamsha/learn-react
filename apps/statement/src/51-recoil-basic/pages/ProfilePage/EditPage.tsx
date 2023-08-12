import { type ChangeEvent } from 'react';
import { useProfile, useUpdateProfile } from './states/ProfileState';

export const EditPage = () => {
  const { profile } = useProfile();

  const { edit } = useUpdateProfile();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    edit(e.target.value);
  };

  return (
    <>
      <h2>Edit Page</h2>
      <fieldset>
        <legend>name</legend>
        <input value={profile.name} onChange={handleChange} />
      </fieldset>
      <p>name: {profile.name}</p>
    </>
  );
};
