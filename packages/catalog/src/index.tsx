import { css } from '@emotion/css';
import { Navigation } from '@learn-react/core/components/Navigation';
import { PageTransition } from '@learn-react/core/components/PageTransition';
import { applyGlobalStyle } from '@learn-react/core/helpers/Style';
import { useMemo } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { IndexPage } from './pages/IndexPage';
import { StoryPage } from './pages/StoryPage';
import { Components, Hooks } from './Stories';

const App = () => {
  const sections = useMemo(
    () => [
      {
        label: 'Components',
        items: Object.keys(Components)
          .sort()
          .map(story => ({
            label: story,
            to: `/components/${story}/`,
          })),
      },
      {
        label: 'Hooks',
        items: Object.keys(Hooks)
          .sort()
          .map(story => ({
            label: story,
            to: `/hooks/${story}/`,
          })),
      },
    ],
    [],
  );

  return (
    <BrowserRouter>
      <div className={baseStyle}>
        <Navigation title="React Catalog" sections={sections} />
        <main className={contentStyle}>
          <PageTransition>
            <Route path="/" exact>
              <IndexPage />
            </Route>
            <Route path="/:category/:story">
              <StoryPage />
            </Route>
          </PageTransition>
        </main>
      </div>
    </BrowserRouter>
  );
};

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
