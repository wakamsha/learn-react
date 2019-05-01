import * as React from 'react';
import { render } from 'react-dom';

type Props = {
  name: string;
};

class HelloMessage extends React.Component<Props> {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

render(<HelloMessage name="wakamsha" />, document.getElementById('app'));
