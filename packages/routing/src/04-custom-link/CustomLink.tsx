import { BrowserRouter, Route } from 'react-router-dom';
import { OldSchoolMenuLink } from './components/OldSchoolMenuLink';
import { About } from './pages/About';
import { Home } from './pages/Home';

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
