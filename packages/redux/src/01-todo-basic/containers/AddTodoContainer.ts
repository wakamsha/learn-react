import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TodoAction, addTodo } from '../actions';
import { AddTodo, Props } from '../components/AddTodo';

function mapStateToProps(): {} {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<TodoAction>): Props {
  return {
    onSubmit: (text: string) => dispatch(addTodo(text)),
  };
}

export const AddTodoContainer = connect<{}, Props, {}>(mapStateToProps, mapDispatchToProps)(AddTodo);
