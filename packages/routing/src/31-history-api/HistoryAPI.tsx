import { Router } from 'react-router-dom';
import { App } from './bootstraps/App';
import { HistoryContext, LocationContext, useHistory } from './hooks/useHistory';

export const HistoryAPIApp = () => {
  const { history, location } = useHistory();

  return (
    <HistoryContext.Provider value={history}>
      <LocationContext.Provider value={location}>
        <Router history={history}>
          <App />
        </Router>
      </LocationContext.Provider>
    </HistoryContext.Provider>
  );
};
