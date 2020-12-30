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
  const items = useMemo(
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
      <div className={styleBase}>
        <Navigation title="Catalog | Learn React" items={items} />
        <main>
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

const styleBase = css`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  height: 100vh;
`;

applyGlobalStyle();

render(<App />, document.getElementById('app'));
