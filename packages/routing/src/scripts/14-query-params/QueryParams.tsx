import * as React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { Child } from './pages/Child';

type Props = {
  location: Location;
};

export const Component = (props: Props) => {
  const params = new URLSearchParams(props.location.search);

  return (
    <>
      <h1>Account</h1>
      <ul>
        <li>
          <Link to={{ pathname: '/account', search: '?name=netflix' }}>Netflix</Link>
        </li>
        <li>
          <Link to={{ pathname: '/account', search: '?name=zillow-group' }}>Zillow Group</Link>
        </li>
        <li>
          <Link to={{ pathname: '/account', search: '?name=yahoo' }}>Yahoo</Link>
        </li>
      </ul>
      <Child name={params.get('name') || ''} />
    </>
  );
};

export const QueryParams = () => (
  <BrowserRouter>
    <Route component={Component} />
  </BrowserRouter>
);
