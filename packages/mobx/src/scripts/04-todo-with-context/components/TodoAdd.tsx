import * as React from 'react';
import { TodoListStore } from '../stores/TodoListStore';
import { observer } from 'mobx-react';

type Props = {
  store: TodoListStore;
};

@observer
export class TodoAdd extends React.Component<Props> {
  private handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => this.props.store.setTask(e.target.value);

  private handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!this.props.store.task) return;
    this.props.store.addTodo();
  };

  public render() {
    const { task } = this.props.store;
    return (
      <form onSubmit={this.handleAddTodo}>
        <label>New Task: </label>
        <input value={task} onChange={this.handleTaskChange} />
        <button>Add</button>
      </form>
    );
  }
}
