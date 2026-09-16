import { useEditName, useName } from '../../containers/ProfileContainer';

export const ProfileShowPage = () => {
  const name = useName();
  const setName = useEditName();

  const handleReset = () => {
    setName('');
  };

  return (
    <>
      <h2>Show Page</h2>
      <p>name: {name}</p>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};
