import * as React from 'react';
import { JSONPlaceholderStore } from '../stores/JSONPlaceholderStore';
import { observer } from 'mobx-react';

type Props = {
  store: JSONPlaceholderStore;
};

@observer
export class GetWithParamForm extends React.Component<Props> {
  private onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => this.props.store.setUserId(Number(e.target.value));

  private onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.store.getUser();
  };

  public render() {
    const { store } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Get w/ Params</h3>
        <p>取得する User の id を指定</p>
        <input type="number" max={100} disabled={store.fetching} onChange={this.onChangeId} />
        <p>
          ID: <code>{store.userId}</code>
        </p>
        <button disabled={store.fetching}>GET</button>
      </form>
    );
  }
}
