import { PageTransition } from '@learn-react/core/components/utils/PageTransition';
import { applyGlobalStyle } from '@learn-react/core/helpers/Style';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { IndexPage } from './pages/IndexPage';
import { StoryPage } from './pages/StoryPage';

const App = () => (
  <BrowserRouter>
    <Layout>
      <PageTransition>
        <Route path="/" exact>
          <IndexPage />
        </Route>
        <Route path="/:subPackage/:type/:category/:story/">
          <StoryPage />
        </Route>
      </PageTransition>
    </Layout>
  </BrowserRouter>
);

applyGlobalStyle();

render(<App />, document.getElementById('app'));
