import * as React from 'react';
import { About } from './pages/About';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { OldSchoolMenuLink } from './components/OldSchoolMenuLink';

export const CustomLink = () => (
  <BrowserRouter>
    <>
      <OldSchoolMenuLink to="/" label="Home" activeOnlyWhenExact />
      <OldSchoolMenuLink to="/about" label="About" />
      <hr />
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} />
    </>
  </BrowserRouter>
);
