import { LineHeight } from '@learn-react/core/constants/Style';
import { gutter } from '@learn-react/core/helpers/Style';
import { css } from 'emotion';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Stories } from '../Stories';

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

const baseStyle = css`
  height: 100vh;
  background: #f6f6f8;
`;

const titleStyle = css`
  margin: 0 0 ${gutter(8)};
  font-size: 24px;
  line-height: ${LineHeight.Regular};
  white-space: nowrap;
`;

const previewStyle = css`
  padding: ${gutter(4)} ${gutter(6)};
`;
