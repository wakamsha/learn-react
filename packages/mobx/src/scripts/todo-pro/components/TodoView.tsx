import * as React from 'react';
import { TodoStore } from '../stores/TodoStore';
import { observer } from 'mobx-react';

type Props = {
  todo: TodoStore;
};

@observer
export class TodoView extends React.Component<Props> {
  private handleToggleCompleted = () => this.props.todo.toggleCompleted();

  private handleRename = () =>
    this.props.todo.updateTask(prompt(`Task name`, this.props.todo.task) || this.props.todo.task);

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
