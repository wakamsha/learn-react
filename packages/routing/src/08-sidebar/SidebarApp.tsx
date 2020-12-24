import { css } from 'emotion';
import { useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Bubblegum } from './pages/Bubblegum';
import { Home } from './pages/Home';
import { Shoelaces } from './pages/Shoelaces';

const baseStyle = css({
  display: 'flex',
  height: 'calc(100vh - 16px)',
});

const sidebarWrapperStyle = css({
  background: '#eee',
  padding: 16,
});

const contentWrapperStyle = css({
  padding: 16,
});

export const SidebarApp = () => {
  const [currentPath, setState] = useState(window.location.pathname);

  const handleClick = useCallback((path: string) => setState(path), []);

  useEffect(() => {
    window.addEventListener('popstate', () => setState(window.location.pathname));
  }, []);

  return (
    <BrowserRouter>
      <div className={baseStyle}>
        <nav className={sidebarWrapperStyle}>
          <Sidebar currentPath={currentPath} handleClick={handleClick} />
        </nav>
        <main className={contentWrapperStyle}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/bubblegum" component={Bubblegum} />
            <Route path="/shoelaces" component={Shoelaces} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};
