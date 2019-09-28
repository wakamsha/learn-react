import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export class ProfileFooPage extends React.Component {
  public render() {
    return (
      <>
        <h2>Foo Profile</h2>
      </>
    );
  }
}
