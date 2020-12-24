import { useContext } from '@learn-react/core/hooks/useContext';
import { HistoryContext } from '../hooks/useHistory';

export const Home = () => {
  const history = useContext(HistoryContext);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to this site!!!!</p>
      <button onClick={() => history.push('/about')}>go about</button>
    </div>
  );
};
