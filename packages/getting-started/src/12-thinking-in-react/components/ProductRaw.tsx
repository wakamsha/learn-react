import React from 'react';

type Product = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
};

type Props = {
  product: Product;
};

export function ProductRaw(props: Props) {
  const { product } = props;
  const pName = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>;

  return (
    <tr>
      <th>{pName}</th>
      <td>{product.price}</td>
    </tr>
  );
}
