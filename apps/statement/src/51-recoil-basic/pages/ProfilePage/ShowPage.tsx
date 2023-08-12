import { useProfile, useUpdateProfile } from './states/ProfileState';

export const ShowPage = () => {
  const { profile } = useProfile();

  const { reset } = useUpdateProfile();

  const handleReset = () => {
    reset();
  };

  return (
    <>
      <h2>Show Page</h2>
      <p>name: {profile.name}</p>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};
