import { decCount, incCount } from '../../state/counter/actions';
import { useDispatch } from 'react-redux';
import React from 'react';

export const Counter = () => {
  const dispatch = useDispatch();

  const handleClickInc = useCallback(() => dispatch(incCount(1)), [dispatch]);
  const handleClickDec = useCallback(() => dispatch(decCount(1)), [dispatch]);

  return (
    <>
      <button onClick={handleClickInc}>
        <span role="img" aria-label="thumbs up">
          👍
        </span>
      </button>
      <button onClick={handleClickDec}>
        <span role="img" aria-label="thumbs down">
          👎
        </span>
      </button>
    </>
  );
};
