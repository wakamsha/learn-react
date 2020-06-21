import { Router } from '../../@core/constants/Router';
import { useRouting } from '../../@core/components/RoutingProvider';
import React, { useCallback } from 'react';

export const About = () => {
  const { history } = useRouting();

  const handleClick = useCallback(() => history.push(Router.Paths.Home), []);

  return (
    <div>
      <h1>About page</h1>
      <p>The Beatles についてのページです。</p>
      <button onClick={handleClick}>Go Home</button>
    </div>
  );
};
