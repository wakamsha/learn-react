import { AddTodo, Props } from '../components/AddTodo';
import { Dispatch } from 'redux';
import { TodoAction, addTodo } from '../../state/todos/actions';
import { connect } from 'react-redux';

function mapStateToProps(): {} {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<TodoAction>): Props {
  return {
    onSubmit: (text: string) => dispatch(addTodo(text)),
  };
}

export const AddTodoContainer = connect<{}, Props, {}>(mapStateToProps, mapDispatchToProps)(AddTodo);
