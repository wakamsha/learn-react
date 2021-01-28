import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FilterType } from '../../state/filters/reducers';
import { TodoAction, toggleTodo } from '../../state/todos/actions';
import { Todo } from '../../state/todos/reducers';
import { getFilteredTodos } from '../../state/todos/selectors';
import { Props, TodoList } from '../components/TodoList';

function mapStateToProps({ todos, filter }: { todos: Todo[]; filter: FilterType }): Pick<Props, 'todos'> {
  return {
    todos: getFilteredTodos(todos, filter),
  };
}

function mapDispatchToProps(dispatch: Dispatch<TodoAction>): Pick<Props, 'onClick'> {
  return {
    onClick: (id: number) => dispatch(toggleTodo(id)),
  };
}

export const TodoListContainer = connect<Pick<Props, 'todos'>, Pick<Props, 'onClick'>, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);
