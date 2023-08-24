import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { useReducer, type ChangeEvent } from 'react';
import { useTodoAction } from '../states/todoState';

export const AddForm = () => {
  console.info('add form');

  const [{ title, content }, dispatch] = useReducer(reducer, {
    title: '',
    content: '',
  });

  const { add } = useTodoAction();

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
    add(title, content);
    dispatch({ type: 'reset' });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset className={styleFieldset}>
        <legend>New Todo</legend>

        <label className={styleFormItem}>
          <span>Title</span>
          <input placeholder="タイトル" value={title} className={styleInput} onChange={handleInputTitle} />
        </label>

        <label className={styleFormItem}>
          <span>Content</span>
          <textarea placeholder="詳細" value={content} className={styleInput} onChange={handleInputContent} />
        </label>

        <button disabled={!title.length} onClick={handleSubmit}>
          Add
        </button>
      </fieldset>
    </form>
  );
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
      return {
        title: '',
        content: '',
      };
    default:
      return state;
  }
}

const styleFieldset = css`
  display: grid;
  gap: ${gutter(2)};
`;

const styleFormItem = css`
  display: grid;
  gap: ${gutter(1)};
`;

const styleInput = css`
  padding: ${gutter(2)};
  resize: vertical;
`;
