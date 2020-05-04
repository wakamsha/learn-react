import { JSONPlaceholderStore } from '../stores/JSONPlaceholderStore';
import { TransactionStatus, transaction } from '../utils/Decorator';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

type Props = {
  store: JSONPlaceholderStore;
};

type State = {
  status: TransactionStatus;
};

@observer
export class GetForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: 'Idling',
    };
  }

  private handleClick = () => this.handleGetAllUsers();

  @transaction('status')
  private *handleGetAllUsers() {
    const { store } = this.props;

    yield store.getAllUsers();
  }

  public render() {
    const { status } = this.state;
    const fetching = status === 'Running';

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
