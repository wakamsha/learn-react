import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TodoAction, toggleTodo } from '../actions';
import { Props, TodoList } from '../components/TodoList';
import { Todo } from '../reducers';

function mapStateToProps(state: Todo[]): Pick<Props, 'todos'> {
  return {
    todos: state,
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
