import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FilterAction, setFilter } from '../../state/filters/actions';
import { FilterType } from '../../state/filters/reducers';
import { Filters } from '../components/Filters';

function mapStateToProps({ filter }: { filter: FilterType }) {
  return {
    currentFilter: filter,
  };
}

function mapDispatchToProps(dispatch: Dispatch<FilterAction>) {
  return {
    onChange: (type: FilterType) => dispatch(setFilter(type)),
  };
}

export const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filters);
