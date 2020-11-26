import { BrowserRouter, Route } from 'react-router-dom';
import { IndexPage } from './pages/IndexPage';
import { Navigation } from '@learn-react/core/components/Navigation';
import { PageTransition } from '@learn-react/core/components/PageTransition';
import { Stories } from './Stories';
import { StoryPage } from './pages/StoryPage';
import { applyGlobalStyle } from '@learn-react/core/helpers/Style';
import { css } from 'emotion';
import { render } from 'react-dom';
import React from 'react';

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
