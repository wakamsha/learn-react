import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../state/filters/actions';
import { FilterType } from '../../state/filters/reducers';
import { AppState } from '../../state/store';
import { Filters as Component } from '../components/Filters';

export const FilterContainer = () => {
  const currentFilter = useSelector<AppState, FilterType>(({ filter }) => filter);

  const dispatch = useDispatch();

  const handleChange = useCallback(
    (type: FilterType) => {
      dispatch(setFilter(type));
    },
    [dispatch],
  );

  return <Component currentFilter={currentFilter} onChange={handleChange} />;
};
