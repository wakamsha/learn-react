import { Link } from 'react-router-dom';
import { css } from 'emotion';
import React from 'react';

export const Navigation = () => (
  <ul className={baseStyle}>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
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
