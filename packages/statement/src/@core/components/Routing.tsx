import { useContext } from '@learn-react/core/hooks/useContext';
import { Action, History, Location, createBrowserHistory } from 'history';
import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Router } from 'react-router-dom';

type Store = {
  history: History;
  location: Location;
};

type Props = {
  children: ReactNode;
};

const Context = createContext<Store | null>(null);

const useStore = (): Store => useContext(Context);

const Provider = ({ children }: Props) => {
  const [location, setLocation] = useState<Location>({ ...window.location, state: {} });

  const history = useMemo(() => createBrowserHistory(), []);

  const handleChangeState = useCallback((location: Location, action: Action) => {
    if (action === 'PUSH' || action === 'REPLACE') {
      window.scrollTo(0, 0);
    }
    setLocation(location);
  }, []);

  useEffect(() => {
    history.listen(handleChangeState);
  }, [handleChangeState, history]);

  return (
    <Context.Provider value={{ history, location }}>
      <Router history={history}>{children}</Router>
    </Context.Provider>
  );
};

export const Routing = {
  Provider,
  useStore,
} as const;
