import { Action, History, Location, createBrowserHistory } from 'history';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export function useHistory() {
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

  return { history, location };
}

export const HistoryContext = createContext<History | null>(null);

export const LocationContext = createContext<Location | null>(null);
