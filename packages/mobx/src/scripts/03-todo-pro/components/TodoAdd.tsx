import * as React from 'react';
import { TodoListStore } from '../stores/TodoListStore';
import { inject, observer } from 'mobx-react';

type Props = {
  store?: TodoListStore;
};

@inject('store')
@observer
export class TodoAdd extends React.Component<Props> {
  private handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { store } = this.props;

    if (!store) return;

    store.setTask(e.target.value);
  };

  private handleAddTodo = (e: React.FormEvent) => {
    const { store } = this.props;

    e.preventDefault();
    if (!store!.task) return;

    store!.addTodo();
  };

  public render() {
    const { store } = this.props;
    const { task } = store!;
    return (
      <form onSubmit={this.handleAddTodo}>
        <label>New Task: </label>
        <input value={task} onChange={this.handleTaskChange} />
        <button>Add</button>
      </form>
    );
  }
}
