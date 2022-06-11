import { observer } from 'mobx-react';
import type { ChangeEvent, FormEvent } from 'react';
import { Component } from 'react';
import type { UsersStore } from '../stores/UserStore';
import type { TransactionStatus } from '../utils/Decorator';
import { transaction } from '../utils/Decorator';

type Props = {
  store: UsersStore;
};

type State = {
  status: TransactionStatus;
};

@observer
export class GetWithParamForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: {},
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @transaction('status')
  private *handleGetUser() {
    const { store } = this.props;

    yield store.getUser();
  }

  private onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    const { store } = this.props;

    store.setUserId(Number(e.target.value));
  };

  private onSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.handleGetUser();
  };

  public render() {
    const { store } = this.props;
    const { status } = this.state;
    const fetching = !!status.running;

    return (
      <form onSubmit={this.onSubmit}>
        <h3>Get w/ Params</h3>
        <p>取得する User の id を指定</p>
        <input type="number" max={100} value={store.userId} disabled={fetching} onChange={this.onChangeId} />
        <p>
          ID: <code>{store.userId}</code>
        </p>
        <button disabled={fetching}>GET</button>
      </form>
    );
  }
}
