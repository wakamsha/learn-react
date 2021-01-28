import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Actions as FilterActions } from '../../states/Filter/reducer';
import { RootState } from '../../states/store';
import { Actions, State } from '../../states/Todo/reducer';

export const TodoList = () => {
  const todoList = useSelector<RootState, State>(({ todo, filter }) => getFilteredTodoList(todo, filter));

  const dispatch = useDispatch<Dispatch<Actions>>();

  const handleClick = (id: number) => {
    dispatch({
      type: 'Todo.toggle',
      payload: {
        id,
      },
    });
  };

  return (
    <ul>
      {todoList.map(({ id, text, completed }) => (
        <li key={id} onClick={() => handleClick(id)}>
          {completed ? '👌' : '👋'}
          <span style={completed ? { textDecoration: 'line-through' } : {}}>{text}</span>
        </li>
      ))}
    </ul>
  );
};

function getFilteredTodoList(todoList: State, filter: FilterActions['payload']['filter']): State {
  switch (filter) {
    case 'COMPLETED':
      return todoList.filter(t => t.completed);
    case 'INCOMPLETE':
      return todoList.filter(t => !t.completed);
    case 'ALL':
    default:
      return todoList;
  }
}
