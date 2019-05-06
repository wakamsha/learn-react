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
    return (
      <>
        <h3>GET</h3>
        <button onClick={this.handleClick}>GET</button>
      </>
    );
  }
}
