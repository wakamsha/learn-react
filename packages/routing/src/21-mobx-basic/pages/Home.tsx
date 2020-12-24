import { Stores } from '../stores';

export const HomePage = () => (
  <div>
    <h1>Home</h1>
    <p>Welcome to this site!!!!</p>
    <button onClick={() => historyStore.history.push('/about')}>go about</button>
  </div>
);

const { historyStore } = Stores;
