import { css } from '@emotion/css';
import { PageTransition } from '@learn-react/core/components/utils/PageTransition';
import { applyGlobalStyle } from '@learn-react/core/helpers/Style';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { LayoutSwitch } from './components/LayoutSwitch';
import { Navigation } from './components/Navigation';
import { IndexPage } from './pages/IndexPage';
import { StoryPage } from './pages/StoryPage';

const App = () => (
  <BrowserRouter>
    <div className={styleBase}>
      <Navigation />
      <main>
        <PageTransition>
          <Route path="/" exact>
            <IndexPage />
          </Route>
          <Route path="/:subPackage/:type/:category/:story/">
            <StoryPage />
          </Route>
        </PageTransition>
      </main>
      <LayoutSwitch />
    </div>
  </BrowserRouter>
);
const styleBase = css`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  height: 100vh;
`;

applyGlobalStyle();

render(<App />, document.getElementById('app'));
