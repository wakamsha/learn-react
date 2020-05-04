// https://ja.reactjs.org/docs/conditional-rendering.html
import React, { Component, MouseEvent } from 'react';

function UserGreeting(): JSX.Element {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(): JSX.Element {
  return <h1>Please sign up.</h1>;
}

type GreetingProps = {
  loggedIn: boolean;
};
function Greeting(props: GreetingProps): JSX.Element {
  const { loggedIn } = props;
  return loggedIn ? <UserGreeting /> : <GuestGreeting />;
}

function LoginButton({ onClick }: { onClick: (e: MouseEvent) => void }): JSX.Element {
  return <button onClick={onClick}>Login</button>;
}

function LogoutButton({ onClick }: { onClick: (e: MouseEvent) => void }) {
  return <button onClick={onClick}>Logout</button>;
}

type State = {
  loggedIn: boolean;
};
export class LoginControl extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  private handleLoginClick = () => this.setState({ loggedIn: true });
  private handleLogoutClick = () => this.setState({ loggedIn: false });

  public render() {
    const { loggedIn } = this.state;

    return (
      <>
        <Greeting loggedIn={loggedIn} />
        {loggedIn ? <LogoutButton onClick={this.handleLogoutClick} /> : <LoginButton onClick={this.handleLoginClick} />}
      </>
    );
  }
}
