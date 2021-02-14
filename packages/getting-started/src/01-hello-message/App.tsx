// https://ja.reactjs.org/docs/hello-world.html

type Props = {
  name: string;
};
export function HelloMessage({ name }: Props): JSX.Element {
  return <div>Hello {name}!</div>;
}
