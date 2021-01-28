import React from 'react';
import { useSelector } from 'react-redux';
import { getCalculatedValue } from '../../state/counter/selectors';

export const Display = () => {
  const display = useSelector(getCalculatedValue);

  return <h1>{display}</h1>;
};
