import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

export const Navigation = (): JSX.Element => (
  <ul className={navStyle}>
    <li>
      <Link to={{ pathname: '/account', search: '?name=netflix' }}>Netflix</Link>
    </li>
    <li>
      <Link to={{ pathname: '/account', search: '?name=zillow-group' }}>Zillow Group</Link>
    </li>
    <li>
      <Link to={{ pathname: '/account', search: '?name=yahoo' }}>Yahoo</Link>
    </li>
  </ul>
);

const navStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 16,
  height: '100vh',
  borderLeft: '1px solid gray',
  backgroundColor: 'silver',
  flexShrink: 0,

  li: {
    marginBottom: 8,
  },
});
