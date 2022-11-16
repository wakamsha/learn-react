import { applyGlobalStyle, applyResetStyle } from '@learn-react/core/helpers/Style';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App, TypeContainer } from './App';

applyResetStyle();

applyGlobalStyle();

const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(
  <StrictMode>
    <TypeContainer.Provider>
      <App />
    </TypeContainer.Provider>
  </StrictMode>,
);
