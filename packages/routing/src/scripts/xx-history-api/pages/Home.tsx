import { HistoryContext } from '../hooks/useHistory';
import { useContext } from '../../_core/hooks/useContext';
import React from 'react';

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
