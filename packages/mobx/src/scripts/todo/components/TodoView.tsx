import * as React from 'react';
import { Todo } from '../stores/TodoStore';
import { observer } from 'mobx-react';

type Props = {
  todo: Todo;
};

// @MEMO
// observer に hook を使ったコンポーネントを渡すと壊れるので、ひとまずクラスコンポーネントを使うようにしている
@observer
export class TodoView extends React.Component<Props> {
  private handleToggleCompleted = () => {
    const { todo } = this.props;
    todo.completed = !todo.completed;
  };

  private handleRename = () => {
    const { todo } = this.props;
    todo.task = prompt(`Task name`, todo.task) || todo.task;
  };

  public render() {
    const { todo } = this.props;
    return (
      <li onDoubleClick={this.handleRename}>
        <input type="checkbox" checked={todo.completed} onChange={this.handleToggleCompleted} />
        {todo.task}
        {todo.assignee ? <small>{todo.assignee}</small> : null}
      </li>
    );
  }
}
