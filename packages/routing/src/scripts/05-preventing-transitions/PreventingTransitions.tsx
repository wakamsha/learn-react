import { About } from './pages/About';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Form } from './pages/Form';
import { Home } from './pages/Home';
import React from 'react';

export const PreventingTransitions = () => (
  <BrowserRouter>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/form">Form</Link>
      </li>
    </ul>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} />
      <Route path="/form" component={Form} />
    </Switch>
  </BrowserRouter>
);
