import { useState, type ChangeEvent } from 'react';
import { type Todo } from './type';

type Props = {
  onAdd: (title: Todo['title']) => void;
};

/**
 * 新しい Todo を追加します。
 * テキストボックスに summary を入力して submit することで Todo を新規登録します。
 */
export const AddForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');

  const handleInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setTitle(value);
  };

  const handleSubmit = () => {
    if (!title) return;

    onAdd(title);
    setTitle('');
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input value={title} placeholder="what needs to be done?" onChange={handleInput} />

        <button aria-label="add" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
};
