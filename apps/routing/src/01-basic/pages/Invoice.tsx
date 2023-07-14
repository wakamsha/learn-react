import { useParams } from 'react-router-dom';

/**
 * インボイス詳細を表示するページコンポーネントです。
 */
export const Invoice = () => {
  const { id } = useParams();

  return <h2>Invoice: {id}</h2>;
};
