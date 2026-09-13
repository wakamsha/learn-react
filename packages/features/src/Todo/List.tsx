import { css } from '@emotion/css';
import { type ChangeEvent } from 'react';
import { type Todo } from './type';

type Props = {
  todos: Todo[];
  onStatusToggle: (id: Todo['id'], completed: Todo['completed']) => void;
  onDelete: (id: Todo['id']) => void;
};

export const List = ({ todos, onStatusToggle, onDelete }: Props) => {
  const handleStatusToggle = (id: Todo['id'], completed: boolean) => {
    onStatusToggle(id, completed);
  };

  const handleDelete = (id: Todo['id']) => {
    onDelete(id);
  };

  return (
    <ul className={styleRoot}>
      {todos.map((todo) => (
        <li key={todo.id}>
          <ListItem todo={todo} onStatusToggle={handleStatusToggle} onDelete={handleDelete} />
        </li>
      ))}
    </ul>
  );
};

const styleRoot = css`
  padding: 0;
  list-style: none;

  > li + li {
    border-top: 1px solid silver;
  }
`;

type ListItemProps = {
  todo: Todo;
} & Pick<Props, 'onStatusToggle' | 'onDelete'>;

const ListItem = ({ todo, onStatusToggle, onDelete }: ListItemProps) => {
  const handleStatusToggle = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    onStatusToggle(todo.id, checked);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div className={styleListItemRoot}>
      <label className={styleLabel}>
        <input type="checkbox" checked={todo.completed} onChange={handleStatusToggle} />
        {todo.completed ? <s>{todo.title}</s> : <span>{todo.title}</span>}
      </label>

      <button className={styleDeleteButton} aria-label="削除" title="削除" onClick={handleDelete}>
        🗑️
      </button>
    </div>
  );
};

const styleListItemRoot = css`
  display: grid;
  grid-template-areas:
    'label   delete-button'
    'message message';
  grid-template-columns: 1fr auto;
  padding: 8px;
  opacity: 1;
  transition: opacity 0.15s;

  &[aria-hidden='true'] {
    opacity: 0;
  }
`;

const styleLabel = css`
  display: flex;
  grid-area: label;
  gap: 4px;
  align-items: center;
`;

const styleDeleteButton = css`
  grid-area: delete-button;
  cursor: pointer;
`;
