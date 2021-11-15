// https://ja.reactjs.org/docs/conditional-rendering.html
import { Component, MouseEvent } from 'react';

const UserGreeting = (): JSX.Element => <h1>Welcome back!</h1>;

const GuestGreeting = (): JSX.Element => <h1>Please sign up.</h1>;

type GreetingProps = {
  loggedIn: boolean;
};
const Greeting = (props: GreetingProps): JSX.Element => {
  const { loggedIn } = props;
  return loggedIn ? <UserGreeting /> : <GuestGreeting />;
};

const LoginButton = ({ onClick }: { onClick: (e: MouseEvent) => void }): JSX.Element => (
  <button onClick={onClick}>Login</button>
);

const LogoutButton = ({ onClick }: { onClick: (e: MouseEvent) => void }) => <button onClick={onClick}>Logout</button>;

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
