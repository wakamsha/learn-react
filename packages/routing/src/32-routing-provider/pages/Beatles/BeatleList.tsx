import { Link } from 'react-router-dom';
import { BEATLES } from '.';

export const BeatleList = () => (
  <ul>
    {BEATLES.map(({ id, nameEn }) => (
      <li key={id}>
        <Link to={`/beatles/${id}`}>{nameEn}</Link>
      </li>
    ))}
  </ul>
);
