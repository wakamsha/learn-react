import { Action, Location, createBrowserHistory } from 'history';
import { action, observable } from 'mobx';

export class HistoryStore {
  public readonly history = createBrowserHistory({});

  @observable public pathname = window.location.pathname;
  @observable public referrer = '';
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
    this.referrer = this.pathname;
    this.pathname = window.location.pathname;
    this.location = location;
  };
}
