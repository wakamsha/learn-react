import { Action, History, Location, createBrowserHistory } from 'history';
import React, { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Router } from 'react-router-dom';
import { useContext } from '../hooks/useContext';

type Context = {
  history: History;
  location: Location;
};

type Props = {
  children: ReactNode;
};

const Context = createContext<Context | null>(null);

export const useRouting = (): Context => useContext(Context);

export const RoutingProvider = ({ children }: Props) => {
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
