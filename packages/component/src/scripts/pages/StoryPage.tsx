import { Stories } from '../Stories';
import { css } from 'emotion';
import { useParams } from 'react-router-dom';
import React, { useMemo } from 'react';

export const StoryPage = () => {
  const { story } = useParams<{ story: Stories }>();

  const Component = useMemo(() => Stories[story], [story]);

  return (
    <div className={baseStyle}>
      <section className={previewStyle}>
        <h1 className={titleStyle}>{story}</h1>
        <Component />
      </section>
    </div>
  );
};

const baseStyle = css({
  height: '100vh',
  background: '#F6F6F8',
});

const titleStyle = css({
  margin: '0 0 32px',
  fontSize: 24,
  lineHeight: 1.6,
  whiteSpace: 'nowrap',
});

const previewStyle = css({
  padding: `16px 24px`,
});
