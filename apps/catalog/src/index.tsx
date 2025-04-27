/**
 * @file catalog アプリケーションのエントリポイント。
 */

import { PageTransition } from '@learn-react/core/src/components/utils/PageTransition';
import { applyGlobalStyle, applyResetStyle } from '@learn-react/core/src/helpers/Style';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { IndexPage } from './pages/IndexPage';
import { StoryPage } from './pages/StoryPage';

const App = () => (
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <PageTransition>
          <Route path="/" element={<IndexPage />} />
          <Route path=":storyId" element={<StoryPage />} />
        </PageTransition>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);

applyResetStyle();

applyGlobalStyle();

const root = createRoot(document.querySelector('#app') as HTMLElement);

root.render(<App />);

declare const ENV: unknown;

console.info(22, ENV);
