import { inject, observer } from 'mobx-react';
import type { ChangeEvent, FormEvent } from 'react';
import { Component } from 'react';
import type { TodoListStore } from '../stores/TodoListStore';

type Props = {
  store?: TodoListStore;
};

@inject('store')
@observer
export class TodoAdd extends Component<Props> {
  private handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { store } = this.props;

    if (!store) return;

    store.setTask(e.target.value);
  };

  private handleAddTodo = (e: FormEvent) => {
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
