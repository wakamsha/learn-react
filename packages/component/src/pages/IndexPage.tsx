import { FontSize } from '@learn-react/core/constants/Style';
import { css } from 'emotion';
import { gutter } from '@learn-react/core/helpers/Style';
import React from 'react';

export const IndexPage = () => (
  <section className={baseStyle}>
    <div className={bannerStyle}>
      <h1 className={bannerLabelStyle}>Component Catalog</h1>
    </div>
  </section>
);

const baseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #282c34;
`;

const bannerStyle = css`
  padding: ${gutter(1)};
  border: 4px solid gray;
`;

const bannerLabelStyle = css`
  padding: ${gutter(4)};
  margin: 0;
  font-size: ${FontSize.Medium};
  color: gray;
  border: 1px solid gray;
`;
