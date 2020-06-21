import { Link } from 'react-router-dom';
import { Router } from '../../@core/constants/Router';
import { NavigationStyle as Style } from '../../@core/constants/Style';
import React from 'react';

export const Navigation = () => (
  <nav className={Style.Base}>
    <h1 className={Style.Title}>MobX Basic</h1>
    <ul className={Style.Navigation}>
      <li>
        <Link to={Router.Paths.Home}>Home</Link>
      </li>
      <li>
        <Link to={Router.Paths.About}>About</Link>
      </li>
    </ul>
  </nav>
);
