import * as React from 'react';
import { Dialog } from './Dialog';

type State = {
  login: string;
};

export class SignUpDialog extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { login: '' };
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ login: e.target.value });

  private handleSignUp = () => alert(`Welcome aboard, ${this.state.login}!`);

  public render() {
    return (
      <Dialog title="Mars Exploration Program" message="How should we refer to you?">
        <input type="text" value={this.state.login} onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>Sign Me Up!</button>
      </Dialog>
    );
  }
}
