import { Component } from 'react';
import { Logger } from './decorators/Decorator';

type Props = {
  inject?: string;
};

@Logger('Hello world!', 'render log')
export class HOCExample extends Component<Props> {
  public render() {
    const { inject } = this.props;

    return <div>{inject}</div>;
  }
}
