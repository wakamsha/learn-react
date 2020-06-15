import { Action, Location, createBrowserHistory } from 'history';
import { action, observable } from 'mobx';
import { createContext } from 'react';

export class HistoryStore {
  public static Context = createContext<HistoryStore | null>(null);

  public readonly history = createBrowserHistory();

  @observable public location: Location = {
    ...window.location,
    state: {},
  } as any;

  constructor() {
    this.history.listen(this.handlePopState);
  }

  @action
  private handlePopState = (location: Location, action: Action) => {
    if (action === 'PUSH' || action === 'REPLACE') {
      window.scrollTo(0, 0);
    }

    this.location = location;
  };
}
