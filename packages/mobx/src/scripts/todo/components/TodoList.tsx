import * as React from 'react';
import { TodoStore } from '../stores/TodoStore';
import { TodoView } from './TodoView';
import { observer } from 'mobx-react';

type Props = {
  store: TodoStore;
};

@observer
export class TodoList extends React.Component<Props> {
  private handleClick = () => this.props.store.addTodo(prompt(`Enter a new Todo:`, 'コーヒー入れる') || '');

  private handleClickAsync = () => {
    const { store } = this.props;
    store.pendingRequests++;
    setTimeout(() => {
      store.addTodo(`Random Todo - ${Math.random()}`);
      store.pendingRequests--;
    }, 2000);
  };

  public render() {
    const { store } = this.props;
    return (
      <>
        <p>{store.report}</p>
        <ul>
          {store.todos.map((todo, i) => (
            <TodoView key={i} todo={todo} />
          ))}
        </ul>
        {store.pendingRequests ? <strong>Loading...</strong> : null}
        <button onClick={this.handleClick}>New Todo</button>
        <hr />
        <button onClick={this.handleClickAsync}>Add Todo Async</button>
      </>
    );
  }
}
