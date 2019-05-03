import * as React from 'react';

type Props = {
  name: string;
};

export const Child = (props: Props) =>
  props.name ? (
    <h3>
      The <code>name</code> in the query string is "{props.name}"
    </h3>
  ) : (
    <h3>There is no name in the query string.</h3>
  );
