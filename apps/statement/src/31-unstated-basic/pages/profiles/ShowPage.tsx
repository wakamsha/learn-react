import { ProfileContainer } from '../../containers/ProfileContainer';

export const ProfileShowPage = () => {
  const { name, setName } = ProfileContainer.useContainer();

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
