// https://ja.reactjs.org/docs/hello-world.html

type Props = {
  name: string;
};
export const HelloMessage = ({ name }: Props): JSX.Element => <div>Hello {name}!</div>;
