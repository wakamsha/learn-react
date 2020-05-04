import { About } from './pages/About';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Friends } from './pages/Friends';
import { Home } from './pages/Home';
import React from 'react';

export function Basic() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/friends">Friends</Link>
        </li>
      </ul>
      <hr />
      <div>
        {/* location プロパティを指定すると子Routeに値を伝達出来るようになる。ただし、そのままではbindされないので、自前で更新する実装が必要。 */}
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/friends" component={Friends} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
