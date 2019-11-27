import * as React from 'react';
import { FilterType } from '../../state/filters/reducers';

export type Props = {
  currentFilter: FilterType;
  onChange: (type: FilterType) => void;
};

const filterItems: Record<FilterType, string> = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete',
};

export const Filters = ({ currentFilter, onChange }: Props) => (
  <div>
    {Object.keys(filterItems).map((key: FilterType) => (
      <button key={key} onClick={() => onChange(key)} style={key === currentFilter ? { fontWeight: 'bold' } : {}}>
        {filterItems[key]}
      </button>
    ))}
  </div>
);
