import { Link } from 'react-router-dom';
import { Router } from '../constants/Router';
import { css } from 'emotion';
import React from 'react';

export const Navigation = () => (
  <ul className={baseStyle}>
    <li>
      <Link to={Router.Paths.Home}>Home</Link>
    </li>
    <li>
      <Link to={Router.Paths.About}>About</Link>
    </li>
    <li>
      <Link to={Router.Paths.Friends}>Friends</Link>
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
