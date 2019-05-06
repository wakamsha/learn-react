import * as React from 'react';
import { Logger } from './decorators/Decorator';

type Props = {
  inject?: string;
};

@Logger('Hello world!', 'render log')
export class HOCExample extends React.Component<Props> {
  public render() {
    return <div>{this.props.inject}</div>;
  }
}
