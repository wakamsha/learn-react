import { Link } from 'react-router-dom';
import { Router } from '../Router';
import { css } from 'emotion';
import React from 'react';

export const Navigation = () => (
  <ul className={baseStyle}>
    <li>
      <Link to={Router.paths.home}>Home</Link>
    </li>
    <li>
      Profile
      <ul>
        <li>
          <Link to={Router.paths.profileEdit}>Edit</Link>
        </li>
        <li>
          <Link to={Router.paths.profileShow}>Show</Link>
        </li>
      </ul>
    </li>
    <li>
      <Link to={Router.paths.list}>List</Link>
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
