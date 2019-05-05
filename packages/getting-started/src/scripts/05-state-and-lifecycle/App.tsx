// https://ja.reactjs.org/docs/state-and-lifecycle.html
import * as React from 'react';

type State = {
  seconds: number;
};

export class Timer extends React.Component<{}, State> {
  private interval: number;

  constructor(props: {}) {
    super(props);
    this.state = {
      seconds: 0,
    };
  }

  public tick() {
    this.setState(state => ({
      seconds: state.seconds + 1,
    }));
  }

  public componentDidMount() {
    this.interval = window.setInterval(() => this.tick(), 1000);
  }

  public componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  public render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}
