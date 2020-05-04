import { JSONPlaceholderStore } from '../stores/JSONPlaceholderStore';
import { TransactionStatus, transaction } from '../utils/Decorator';
import { observer } from 'mobx-react';
import React, { ChangeEvent, Component, FormEvent } from 'react';

type Props = {
  store: JSONPlaceholderStore;
};

type State = {
  status: TransactionStatus;
};

@observer
export class GetWithParamForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: 'Idling',
    };
  }

  private onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    const { store } = this.props;

    store.setUserId(Number(e.target.value));
  };

  private onSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.handleGetUser();
  };

  @transaction('status')
  private *handleGetUser() {
    const { store } = this.props;

    yield store.getUser();
  }

  public render() {
    const { store } = this.props;
    const { status } = this.state;
    const fetching = status === 'Running';

    return (
      <form onSubmit={this.onSubmit}>
        <h3>Get w/ Params</h3>
        <p>取得する User の id を指定</p>
        <input type="number" max={100} disabled={fetching} onChange={this.onChangeId} />
        <p>
          ID: <code>{store.userId}</code>
        </p>
        <button disabled={fetching}>GET</button>
      </form>
    );
  }
}
