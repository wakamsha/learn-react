import { TodoStore } from '../stores/TodoStore';
import { observer } from 'mobx-react';
import React from 'react';

type Props = {
  todo: TodoStore;
};

@observer
export class TodoView extends React.Component<Props> {
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
