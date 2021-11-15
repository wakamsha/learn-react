// https://ja.reactjs.org/docs/lists-and-keys.html

const ListItem = ({ value }: { value: number }): JSX.Element => <li>{value}</li>;

type Props = {
  numbers: number[];
};
export const NumberList = (props: Props): JSX.Element => {
  const { numbers } = props;
  return (
    <ul>
      {numbers.map(num => (
        <ListItem key={`${num}`} value={num} />
      ))}
    </ul>
  );
};
