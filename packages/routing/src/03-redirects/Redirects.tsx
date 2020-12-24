import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { AuthButton } from './components/AuthButton';
import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './pages/Login';
import { Protected } from './pages/Protected';
import { Public } from './pages/Public';

export const Redirects = () => (
  <BrowserRouter>
    <>
      <AuthButton />
      <ul>
        <li>
          <Link to="/public">Public page</Link>
        </li>
        <li>
          <Link to="/protected">Protected page</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/public" component={Public} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Protected} />
      </Switch>
    </>
  </BrowserRouter>
);
