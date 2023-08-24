import { useGetTodoAction } from '../states/todoState';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todoIds } = useGetTodoAction();

  return (
    <ul>
      {todoIds.map((todoId) => (
        <li key={todoId}>
          <TodoItem todoId={todoId} />
        </li>
      ))}
    </ul>
  );
};
