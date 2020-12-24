type Props = {
  name: string;
};

export const Child = ({ name }: Props) =>
  name ? (
    <h3>
      The <code>name</code> in the query string is {`"${name}"`}
    </h3>
  ) : (
    <h3>There is no name in the query string.</h3>
  );
