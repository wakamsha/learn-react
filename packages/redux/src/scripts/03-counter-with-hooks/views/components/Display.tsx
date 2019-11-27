import * as React from 'react';
import { getCalculatedValue } from '../../state/counter/selectors';
import { useSelector } from 'react-redux';

export const Display = () => {
  const display = useSelector(getCalculatedValue);

  return <h1>{display}</h1>;
};
