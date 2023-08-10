import { type ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { profileState } from './states/profileState';

export const EditPage = () => {
  const [profile, setProfile] = useRecoilState(profileState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({ name: e.target.value });
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
