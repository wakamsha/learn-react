import { css, cx } from '@emotion/css';
import { FontSize } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter, square } from '@learn-react/core/src/helpers/Style';
import { useReducer, useState, type ChangeEvent } from 'react';
import { useGetTodoAction, useTodoAction } from '../states/todoState';

type Props = {
  todoId: number;
};

export const TodoItem = ({ todoId }: Props) => {
  const { remove, edit, toggleComplete } = useTodoAction();

  const { useGetTodo } = useGetTodoAction();

  const todo = useGetTodo(todoId);

  const [editing, setEditing] = useState(false);

  const handleToggle = () => {
    setEditing((state) => !state);
  };

  const [{ title, content }, dispatch] = useReducer(reducer, {
    title: todo?.title ?? '',
    content: todo?.content ?? '',
  });

  const handleInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'title',
      payload: e.target.value,
    });
  };

  const handleInputContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: 'content',
      payload: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!todo) return;

    edit(todo.id, { title, content });
    setEditing(false);
  };

  return todo ? (
    <div className={styleRoot}>
      <div className={styleCheckbox}>
        <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
      </div>

      {editing ? (
        <form className={styleForm} onSubmit={(e) => e.preventDefault()}>
          <input autoFocus className={styleInputTitle} value={title} placeholder="Title" onChange={handleInputTitle} />
          <textarea className={styleInputContent} value={content} placeholder="Content" onChange={handleInputContent} />
          <div className={styleFormControls}>
            <button className={styleFormButton} onClick={handleSubmit}>
              更新
            </button>
            <button className={styleFormButton} onClick={handleToggle}>
              キャンセル
            </button>
          </div>
        </form>
      ) : (
        <button className={styleDisplay} onClick={handleToggle}>
          <div className={cx(styleTitle, todo.completed && styleTitleCompleted)}>{todo.title}</div>
          <p className={styleContent}>{todo.content}</p>
        </button>
      )}

      <div className={styleOptions}>
        <button onClick={() => remove(todo.id)}>🗑️</button>
      </div>
    </div>
  ) : null;
};

type State = {
  title: string;
  content: string;
};

type Action =
  | {
      type: 'title';
      payload: State['title'];
    }
  | {
      type: 'content';
      payload: State['content'];
    }
  | {
      type: 'reset';
      payload: State;
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'title':
    case 'content':
      return {
        ...state,
        [action.type]: action.payload,
      };
    case 'reset':
      return action.payload;
    default:
      return state;
  }
}

const styleRoot = css`
  display: grid;
  grid-template-areas: 'masthead body options';
  grid-template-columns: auto 1fr auto;
  gap: ${gutter(4)};
  padding: ${gutter(2)};

  &:hover {
    background-color: ${cssVar('ThemePrimaryLight')};
  }
`;

const styleCheckbox = css`
  padding: ${gutter(1)} 0;

  > input {
    ${square(24)}
  }
`;

const styleDisplay = css`
  display: grid;
  padding: 0;
  text-align: left;
  appearance: none;
  background-color: transparent;
  border: none;
`;

const styleTitle = css`
  font-size: ${FontSize.Medium};
  font-weight: bold;
  color: ${cssVar('TextNeutral')};
`;

const styleTitleCompleted = css`
  color: ${cssVar('TextSub')};
  text-decoration: line-through;
`;

const styleContent = css`
  font-size: ${FontSize.Small};
  color: ${cssVar('TextSub')};
  white-space: pre-wrap;
`;

const styleForm = css`
  display: grid;
  gap: ${gutter(1)};
`;

const styleInputBase = css`
  padding: 0;
  appearance: none;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`;

const styleInputTitle = cx(
  styleInputBase,
  css`
    font-size: ${FontSize.Medium};
    font-weight: bold;
    color: ${cssVar('TextNeutral')};
  `,
);

const styleInputContent = cx(
  styleInputBase,
  css`
    font-size: ${FontSize.Small};
    color: ${cssVar('TextSub')};
    resize: vertical;
  `,
);

const styleFormControls = css`
  display: flex;
  flex-direction: row-reverse;
  gap: ${gutter(1)};
  justify-content: flex-start;
`;

const styleFormButton = css`
  font-size: ${FontSize.Small};
  cursor: pointer;
`;

const styleOptions = css`
  display: flex;
  gap: ${gutter(1)};
  align-items: flex-start;
  padding: ${gutter(1)} 0;
  font-size: ${FontSize.Small};
  visibility: hidden;

  &:is(${`.${styleRoot}`}:hover *) {
    visibility: visible;
  }
`;
