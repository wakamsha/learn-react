import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IndexPage } from './pages/IndexPage';
import { Navigation } from './components/Navigation';
import { StoryPage } from './pages/StoryPage';
import { applyGlobalStyle } from '@learn-react/core/helpers/Style';
import { css } from 'emotion';
import { render } from 'react-dom';
import React from 'react';

const App = () => (
  <BrowserRouter>
    <div className={baseStyle}>
      <Navigation />
      <main className={contentStyle}>
        <Switch>
          <Route path="/" component={IndexPage} exact />
          <Route path="/stories/:story" component={StoryPage} />
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
  height: '100vh',
  flexGrow: 1,
});

applyGlobalStyle();

render(<App />, document.getElementById('app'));
