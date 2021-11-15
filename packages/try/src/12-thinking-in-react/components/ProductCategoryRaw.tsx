type Props = {
  category: string;
};

export const ProductCategoryRaw = ({ category }: Props) => (
  <tr>
    <th colSpan={2}>{category}</th>
  </tr>
);
