import { Navigation } from '@learn-react/core/components/Navigation';
import { PageTransition } from '@learn-react/core/components/PageTransition';
import { applyGlobalStyle } from '@learn-react/core/helpers/Style';
import { css } from 'emotion';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { IndexPage } from './pages/IndexPage';
import { StoryPage } from './pages/StoryPage';
import { Stories } from './Stories';

const App = () => (
  <BrowserRouter>
    <div className={baseStyle}>
      <Navigation title="Component Catalog" items={linkItems} />
      <main className={contentStyle}>
        <PageTransition>
          <Route path="/" component={IndexPage} exact />
          <Route path="/stories/:story" component={StoryPage} />
        </PageTransition>
      </main>
    </div>
  </BrowserRouter>
);

const linkItems = Object.keys(Stories).map(story => ({
  label: story,
  to: `/stories/${story}/`,
}));

const baseStyle = css`
  display: flex;
  width: 100%;
`;

const contentStyle = css`
  flex-grow: 1;
  height: 100vh;
`;

applyGlobalStyle();

render(<App />, document.getElementById('app'));
