import { Link } from 'react-router-dom';
import { Router } from '../constants/Router';
import { NavigationStyle as Style } from '../../@core/constants/Style';
import React from 'react';

export const Navigation = () => (
  <nav className={Style.Base}>
    <h1 className={Style.Title}>MobX Hooks</h1>
    <ul className={Style.Navigation}>
      <li>
        <Link to={Router.paths.home}>Home</Link>
      </li>
      <li>
        Profile
        <ul>
          <li>
            <Link to={Router.paths.profileEdit}>Edit</Link>
          </li>
          <li>
            <Link to={Router.paths.profileShow}>Show</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link to={Router.paths.list}>List</Link>
      </li>
    </ul>
  </nav>
);
