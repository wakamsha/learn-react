type Props = {
  category: string;
};

export function ProductCategoryRaw({ category }: Props) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}
