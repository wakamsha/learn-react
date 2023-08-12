import { css } from '@emotion/css';
import { RecoilRoot } from 'recoil';
import { Log } from './components/Log';
import { NoteItem } from './components/NoteItem';
import { useNotepad, useUpdateNotepad } from './states/NotepadState';

/**
 * @see https://ics.media/entry/210224/
 */
export const NotePage = () => (
  <RecoilRoot>
    <Presentation />
  </RecoilRoot>
);

const Presentation = () => {
  const { notes } = useNotepad();

  const { add } = useUpdateNotepad();

  /**
   * メモ帳を新しく作成します。
   */
  const handleCreate = () => {
    add();
  };

  return (
    <div className={styleBase}>
      <div>
        <ul>
          {notes.map((note) => (
            <NoteItem key={note.id} item={note} />
          ))}
        </ul>
        <button onClick={handleCreate}>追加</button>
      </div>
      <Log />
    </div>
  );
};

const styleBase = css`
  display: grid;
  grid-template-columns: 60% 40%;
  height: 100dvh;
`;
