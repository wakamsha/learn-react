import { Link } from 'react-router-dom';
import { Router } from '../../@core/constants/Router';
import { NavigationStyle as Style } from '../../@core/constants/Style';
import React from 'react';

export const Navigation = () => (
  <nav className={Style.Base}>
    <h1 className={Style.Title}>MobX Hooks</h1>
    <ul className={Style.Navigation}>
      <li>
        <Link to={Router.Paths.Home}>Home</Link>
      </li>
      <li>
        <Link to={Router.Paths.About}>About</Link>
      </li>
      <li>
        Profile
        <ul>
          <li>
            <Link to={Router.Paths.ProfileEdit}>Edit</Link>
          </li>
          <li>
            <Link to={Router.Paths.ProfileShow}>Show</Link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);
