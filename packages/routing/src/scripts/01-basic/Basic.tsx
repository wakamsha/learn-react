import * as React from 'react';
import { About } from './pages/About';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Friends } from './pages/Friends';
import { Home } from './pages/Home';

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
        {/* location プロパティを指定すると子Routeに値を伝達出来るようになる */}
        <Switch location={{ ...window.location, state: { hoge: 'aaaaaaa' } }}>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/friends" component={Friends} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
