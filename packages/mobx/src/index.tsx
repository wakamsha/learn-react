import { applyGlobalStyle, applyResetStyle } from '@learn-react/core/helpers/Style';
import { createRoot } from 'react-dom/client';
import { AsyncWithCC } from './05-async-with-cc/App';

applyResetStyle();

applyGlobalStyle();

const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(
  // <TodoPrimitive />
  // <TodoGettingStarted />
  // <TodoPro />
  // <TodoWithContext />
  <AsyncWithCC />,
  // <AsyncWithFC />,
);
