import { useAtom } from 'jotai';
import { profileAtom } from '../../atoms/profileAtoms';

export const ProfileShowPage = () => {
  const [name, setName] = useAtom(profileAtom);

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
