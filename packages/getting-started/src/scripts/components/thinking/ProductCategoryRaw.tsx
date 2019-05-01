import * as React from 'react';

type Props = {
  category: string;
};

export function ProductCategoryRaw(props: Props) {
  return (
    <tr>
      <th colSpan={2}>{props.category}</th>
    </tr>
  );
}
