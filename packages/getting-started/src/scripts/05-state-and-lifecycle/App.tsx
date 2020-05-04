// https://ja.reactjs.org/docs/state-and-lifecycle.html
import React from 'react';

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

  public componentDidMount() {
    this.interval = window.setInterval(() => this.tick(), 1000);
  }

  public componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  public tick() {
    this.setState(state => ({
      seconds: state.seconds + 1,
    }));
  }

  public render() {
    const { seconds } = this.state;
    return <div>Seconds: {seconds}</div>;
  }
}
