import { Link } from 'react-router-dom';
import { Stories } from '../Stories';
import { css } from 'emotion';
import React from 'react';

export const Navigation = () => (
  <nav className={baseStyle}>
    <h1 className={titleStyle}>Component Catalog</h1>
    <ul className={navigationStyle}>
      {Object.keys(Stories).map(story => (
        <li key={story}>
          <Link to={`/stories/${story}`}>{story}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

const baseStyle = css({
  padding: 16,
  height: '100vh',
  borderLeft: '1px solid gray',
  background: 'silver',
  flexShrink: 0,
});

const titleStyle = css({
  margin: `0 0 16px`,
  paddingBottom: 16,
  borderBottom: `1px solid gray`,
  fontSize: 18,
});

const navigationStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,

  li: {
    marginBottom: 8,
  },
});
