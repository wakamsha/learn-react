import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { NoMatch } from './pages/NoMatch';
import { WillMatch } from './pages/WillMatch';

export const NoMatchApp = () => (
  <BrowserRouter>
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/old-match">Old Match , to be redirected</Link>
        </li>
        <li>
          <Link to="/will-match">Will Match</Link>
        </li>
        <li>
          <Link to="/will-not-match">Will Not Match</Link>
        </li>
        <li>
          <Link to="/also/will/not/match">Also Will Not Match</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/" component={Home} exact />
        <Redirect from="/old-match" to="/will-match" />
        <Route path="/will-match" component={WillMatch} />
        <Route component={NoMatch} />
      </Switch>
    </>
  </BrowserRouter>
);
