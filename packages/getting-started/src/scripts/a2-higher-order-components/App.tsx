import { Logger } from './decorators/Decorator';
import React, { Component } from 'react';

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
