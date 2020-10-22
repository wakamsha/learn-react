import { About } from './pages/About';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Friends } from './pages/Friends';
import { Home } from './pages/Home';
import { Navigation } from './components/Navigation';
import { css } from 'emotion';
import React from 'react';

export const Basic = (): JSX.Element => (
  <BrowserRouter>
    <div className={baseStyle}>
      <Navigation />
      <main className={contentStyle}>
        {/* location プロパティを指定すると子Routeに値を伝達出来るようになる。ただし、そのままではbindされないので、自前で更新する実装が必要。 */}
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/friends" component={Friends} />
        </Switch>
      </main>
    </div>
  </BrowserRouter>
);

const baseStyle = css({
  display: 'flex',
  width: '100%',
});

const contentStyle = css({
  padding: 16,
  height: '100vh',
  flexGrow: 1,
});
