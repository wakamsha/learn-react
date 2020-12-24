import { observer } from 'mobx-react';
import { TodoListStore } from '../stores/TodoListStore';
import { TodoView } from './TodoView';

type Props = {
  store: TodoListStore;
};

export const TodoList = observer(({ store }: Props) => (
  <>
    <p>{store.report}</p>
    <ul>
      {store.todos.map((todo, i) => (
        <TodoView key={i} todo={todo} />
      ))}
    </ul>
  </>
));
