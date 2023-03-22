import { useParams } from 'react-router-dom';

export const Invoice = () => {
  const { id } = useParams();

  return <h2>Invoice: {id}</h2>;
};
