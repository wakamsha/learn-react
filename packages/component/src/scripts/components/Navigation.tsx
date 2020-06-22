import { Link } from 'react-router-dom';
import { Stories } from '../Stories';
import { css, cx } from 'emotion';
import React, { MouseEvent, useCallback, useEffect, useState } from 'react';

export const Navigation = () => {
  const [currentStory, setCurrentStory] = useState('');

  const handleClick = useCallback(({ currentTarget }: MouseEvent<HTMLAnchorElement>) => {
    const { story } = currentTarget.dataset;
    if (!story) return;

    setCurrentStory(story);
  }, []);

  useEffect(() => {
    const [, name] = window.location.pathname.replace(/^\//, '').split('/');
    setCurrentStory(name);

    window.addEventListener('popstate', () => {
      const [, name] = window.location.pathname.replace(/^\//, '').split('/');
      setCurrentStory(name);
    });
  }, []);

  return (
    <nav className={baseStyle}>
      <h1 className={titleStyle}>Component Catalog</h1>
      <ul className={navigationStyle}>
        {Object.keys(Stories).map(story => (
          <li key={story} className={cx(itemStyle, story === currentStory && itemSelectedStyle)}>
            <Link to={`/stories/${story}`} data-story={story} onClick={handleClick}>
              {story}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const baseStyle = css({
  padding: 16,
  height: '100vh',
  borderRight: '1px solid silver',
  background: 'white',
  flexShrink: 0,
});

const titleStyle = css({
  margin: `0 0 16px`,
  paddingBottom: 16,
  borderBottom: `1px solid silver`,
  fontSize: 18,
});

const navigationStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

const itemStyle = css({
  marginBottom: 8,
  fontSize: 14,

  '> a': {
    display: 'block',
    color: 'black',
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

const itemSelectedStyle = css({
  '> a': {
    color: '#E4007F',
    textDecoration: 'none',
    pointerEvents: 'none',
    fontWeight: 'bold',
  },
});
