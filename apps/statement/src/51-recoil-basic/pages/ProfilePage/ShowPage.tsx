import { useRecoilState } from 'recoil';
import { profileState } from './states/profileState';

export const ShowPage = () => {
  const [profile, setProfile] = useRecoilState(profileState);

  const handleReset = () => {
    setProfile({ name: '' });
  };

  return (
    <>
      <h2>Show Page</h2>
      <p>name: {profile.name}</p>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};
