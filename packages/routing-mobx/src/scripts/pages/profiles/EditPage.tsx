import * as React from 'react';
import { ProfileStore } from '../../stores/ProfileStore';
import { observer } from 'mobx-react';

type Props = {
  store: ProfileStore;
};

@observer
export class ProfileEditPage extends React.Component<Props> {
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.store.setName(e.currentTarget.value);
  };

  public render() {
    return (
      <>
        <h2>Edit Profile</h2>
        <fieldset>
          <legend>name</legend>
          <input type="text" onChange={this.handleChange} value={this.props.store.name} />
        </fieldset>
        <p>name: {this.props.store.name}</p>
      </>
    );
  }
}
