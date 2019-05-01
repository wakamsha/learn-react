import * as React from 'react';

type Props = {
  name: string;
};

export class HelloMessage extends React.Component<Props> {
  public render() {
    return <div>Hello {this.props.name}</div>;
  }
}
