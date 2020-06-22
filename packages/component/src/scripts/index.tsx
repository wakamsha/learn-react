import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IndexPage } from './pages/IndexPage';
import { Navigation } from './components/Navigation';
import { StoryPage } from './pages/StoryPage';
import { css, injectGlobal } from 'emotion';
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

injectGlobal({
  '*, *:before, *:after': {
    boxSizing: 'border-box',
  },

  html: {
    fontFamily: 'sans-serif',
    lineHeight: 1.15,
    WebkitTextSizeAdjust: '100%',
    msTextSizeAdjust: '100%',
    msOverflowStyle: 'scrollbar',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    overflowX: 'hidden',
  },

  // Scaffolding
  'html, body': {
    margin: 0,
    padding: 0,
    fontWeight: 500,
    fontFeatureSettings: `'palt' 1`,
  },
});

render(<App />, document.getElementById('app'));
