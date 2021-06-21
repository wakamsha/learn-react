/* eslint-disable no-param-reassign */

import { Product } from '../App';
import { ProductCategoryRaw } from './ProductCategoryRaw';
import { ProductRaw } from './ProductRaw';

type Props = {
  filterText: string;
  stockOnly: boolean;
  products: Product[];
};

export function ProductTable(props: Props) {
  const { filterText, stockOnly, products } = props;
  const rows = products.reduce(
    (acc: { rows: JSX.Element[]; lastCategory: string }, product) => {
      if (!product.name.toLowerCase().includes(filterText.toLowerCase())) {
        return acc;
      }
      if (stockOnly && !product.stocked) {
        return acc;
      }
      if (product.category !== acc.lastCategory) {
        acc.rows.push(<ProductCategoryRaw category={product.category} key={product.category} />);
      }
      acc.rows.push(<ProductRaw product={product} key={product.name} />);
      acc.lastCategory = product.category;
      return acc;
    },
    { rows: [], lastCategory: '' },
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows.rows}</tbody>
    </table>
  );
}
