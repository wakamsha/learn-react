import * as React from 'react';
import { decCount, incCount } from '../../state/counter/actions';
import { useDispatch } from 'react-redux';

export const Counter = () => {
  const dispatch = useDispatch();

  const handleClickInc = React.useCallback(() => dispatch(incCount(1)), [dispatch]);
  const handleClickDec = React.useCallback(() => dispatch(decCount(1)), [dispatch]);

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
