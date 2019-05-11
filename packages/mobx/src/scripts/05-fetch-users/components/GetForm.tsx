import * as React from 'react';
import { JSONPlaceholderStore } from '../stores/JSONPlaceholderStore';
import { TransactionStatus, transaction } from '../utils/Decorator';
import { observer } from 'mobx-react';

type Props = {
  store: JSONPlaceholderStore;
};

type State = {
  status: TransactionStatus;
};

@observer
export class GetForm extends React.Component<Props, State> {
  private handleClick = () => this.handleGetAllUsers();

  constructor(props: Props) {
    super(props);
    this.state = {
      status: 'Idling',
    };
  }

  @transaction('status')
  private *handleGetAllUsers() {
    yield this.props.store.getAllUsers();
  }

  public render() {
    const fetching = this.state.status === 'Running';
    return (
      <>
        <h3>GET</h3>
        <p>
          <button onClick={this.handleClick} disabled={fetching}>
            GET
          </button>
        </p>
      </>
    );
  }
}
