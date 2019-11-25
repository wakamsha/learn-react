import { Dispatch } from 'redux';
import { FilterType } from '../../state/filters/reducers';
import { Props, TodoList } from '../components/TodoList';
import { Todo } from '../../state/todos/reducers';
import { TodoAction, toggleTodo } from '../../state/todos/actions';
import { connect } from 'react-redux';
import { getFilteredTodos } from '../../state/todos/selectors';

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
