import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

export const Navigation = (): JSX.Element => (
  <ul className={baseStyle}>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/friends">Friends</Link>
    </li>
  </ul>
);

const baseStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 16,
  height: '100vh',
  borderLeft: '1px solid gray',
  background: 'silver',
  flexShrink: 0,

  li: {
    marginBottom: 8,
  },
});
