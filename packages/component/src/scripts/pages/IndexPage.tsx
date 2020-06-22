import { css } from 'emotion';
import React from 'react';

export const IndexPage = () => (
  <section className={baseStyle}>
    <div className={bannerStyle}>
      <h1 className={bannerLabelStyle}>Component Catalog</h1>
    </div>
  </section>
);

const baseStyle = css({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const bannerStyle = css({
  padding: 4,
  border: '4px solid',
});

const bannerLabelStyle = css({
  margin: 0,
  padding: 16,
  border: '1px solid',
  fontSize: 16,
});
