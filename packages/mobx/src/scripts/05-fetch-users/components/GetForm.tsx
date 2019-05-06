import * as React from 'react';
import { JSONPlaceholderStore } from '../stores/JSONPlaceholderStore';
import { observer } from 'mobx-react';

type Props = {
  store: JSONPlaceholderStore;
};

@observer
export class GetForm extends React.Component<Props> {
  private handleClick = () => this.props.store.getAllUsers();

  public render() {
    const { fetching } = this.props.store;
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
