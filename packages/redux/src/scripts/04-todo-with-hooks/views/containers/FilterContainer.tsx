import { AppState } from '../../state/store';
import { Filters as Component } from '../components/Filters';
import { FilterType } from '../../state/filters/reducers';
import { setFilter } from '../../state/filters/actions';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback } from 'react';

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
