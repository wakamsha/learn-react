import { BrowserRouter } from 'react-router-dom';
import { Bubblegum } from './pages/Bubblegum';
import { Home } from './pages/Home';
import { Route, Switch } from 'react-router';
import { Shoelaces } from './pages/Shoelaces';
import { Sidebar } from './components/Sidebar';
import { css } from 'emotion';
import React, { useCallback, useState } from 'react';

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

  React.useEffect(() => {
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
