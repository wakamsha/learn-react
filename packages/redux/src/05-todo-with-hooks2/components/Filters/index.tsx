import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Actions } from '../../states/Filter/reducer';
import { RootState } from '../../states/store';

type FilterType = Actions['payload']['filter'];

export const Filters = () => {
  const currentFilter = useSelector<RootState, FilterType>(({ filter }) => filter);

  const dispatch = useDispatch<Dispatch<Actions>>();

  const handleClick = (filter: FilterType) =>
    dispatch({
      type: 'Filter.set',
      payload: {
        filter,
      },
    });

  return (
    <div>
      {Object.entries(filterItems).map(([key, value]) => (
        <button
          key={key}
          onClick={() => handleClick(key as FilterType)}
          style={key === currentFilter ? { fontWeight: 'bold' } : {}}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

const filterItems: Record<FilterType, string> = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete',
};
