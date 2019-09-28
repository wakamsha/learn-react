import * as React from 'react';
import { ProfileStore } from '../../stores/ProfileStore';
import { observer } from 'mobx-react';

type Props = {
  store: ProfileStore;
};

@observer
export class ProfileShowPage extends React.Component<Props> {
  private handleReset = () => this.props.store.setName('');

  public render() {
    return (
      <>
        <h2>Show Profile</h2>
        <p>name: {this.props.store.name}</p>
        <button onClick={this.handleReset}>Reset</button>
      </>
    );
  }
}
