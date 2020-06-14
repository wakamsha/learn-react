import { BrowserRouter, Route } from 'react-router-dom';
import { Child } from './pages/Child';
import { Navigation } from './components/Navigation';
import { css } from 'emotion';
import React from 'react';

type Props = {
  location: Location;
};

const Component = ({ location }: Props): JSX.Element => {
  const params = new URLSearchParams(location.search); // @FIXME babel/polyfill サポート外のため、別途 polyfill が必要

  return (
    <div className={baseStyle}>
      <Navigation />
      <main className={contentStyle}>
        <Child name={params.get('name') || ''} />
      </main>
    </div>
  );
};

const baseStyle = css({
  display: 'flex',
  width: '100%',
});

const contentStyle = css({
  padding: 16,
  height: '100vh',
  flexGrow: 1,
});

export const QueryParams = (): JSX.Element => (
  <BrowserRouter>
    <Route component={Component} />
  </BrowserRouter>
);
