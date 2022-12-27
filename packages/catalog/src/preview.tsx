import { createRoot } from 'react-dom/client';
import { Preview } from './components/Preview';

const root = createRoot(document.getElementById('preview') as HTMLElement);
root.render(<Preview />);
