import { Link } from 'react-router-dom';
import { Stories } from '../../Stories';
import { css, cx } from 'emotion';
import { gutter } from '@learn-react/core/helpers/Style';
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

const baseStyle = css`
  flex-shrink: 0;
  height: 100vh;
  padding: ${gutter(4)};
  background: white;
  border-right: 1px solid silver;
`;

const titleStyle = css`
  padding-bottom: ${gutter(4)};
  margin: 0 0 ${gutter(4)};
  font-size: 18px;
  border-bottom: 1px solid silver;
`;

const navigationStyle = css`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const itemStyle = css`
  margin-bottom: ${gutter(2)};
  font-size: 14px;

  > a {
    display: block;
    color: black;
    &:hover {
      text-decoration: none;
    }
  }
`;

const itemSelectedStyle = css`
  > a {
    font-weight: bold;
    color: #e4007f;
    text-decoration: none;
    pointer-events: none;
  }
`;
