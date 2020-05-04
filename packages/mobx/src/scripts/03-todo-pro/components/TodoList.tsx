import { TodoListStore } from '../stores/TodoListStore';
import { TodoView } from './TodoView';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

type Props = {
  store?: TodoListStore;
};

@inject('store')
@observer
export class TodoList extends Component<Props> {
  public render() {
    const { store } = this.props;
    return (
      <>
        <p>{store!.report}</p>
        <ul>
          {store!.todos.map((todo, i) => (
            <TodoView key={i} todo={todo} />
          ))}
        </ul>
      </>
    );
  }
}
