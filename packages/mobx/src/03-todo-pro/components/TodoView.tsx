/* eslint-disable no-alert */
import { observer } from 'mobx-react';
import { Component } from 'react';
import type { TodoStore } from '../stores/TodoStore';

type Props = {
  todo: TodoStore;
};

@observer
export class TodoView extends Component<Props> {
  private handleToggleCompleted = () => {
    const { todo } = this.props;

    todo.toggleCompleted();
  };

  private handleRename = () => {
    const { todo } = this.props;

    todo.updateTask(prompt(`Task name`, todo.task) || todo.task);
  };

  public render() {
    const { todo } = this.props;

    return (
      <li onDoubleClick={this.handleRename}>
        <input type="checkbox" checked={todo.completed} onChange={this.handleToggleCompleted} />
        {todo.task}
      </li>
    );
  }
}
