import { getCalculatedValue } from '../../state/counter/selectors';
import { useSelector } from 'react-redux';
import React from 'react';

export const Display = () => {
  const display = useSelector(getCalculatedValue);

  return <h1>{display}</h1>;
};
