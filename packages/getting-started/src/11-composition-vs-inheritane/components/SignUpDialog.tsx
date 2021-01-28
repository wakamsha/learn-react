import React, { ChangeEvent, Component } from 'react';
import { Dialog } from './Dialog';

type State = {
  login: string;
};

export class SignUpDialog extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { login: '' };
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>) => this.setState({ login: e.target.value });

  private handleSignUp = () => {
    const { login } = this.state;
    console.info(`Welcome aboard, ${login}!`);
  };

  public render() {
    const { login } = this.state;
    return (
      <Dialog title="Mars Exploration Program" message="How should we refer to you?">
        <input type="text" value={login} onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>Sign Me Up!</button>
      </Dialog>
    );
  }
}
